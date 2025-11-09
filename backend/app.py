# backend/app.py
import os, json, tempfile, subprocess
import requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from PIL import Image
from openai import OpenAI

# --- Import your project's other files ---
from src.infer import load_model, predict_pil_image
from src.soil import recommend
from src.crop import recommend_crop
from src.irrigation import recommend_timing
from src.tts_stt import translate_text, tts   # we'll implement stt locally below

# ------------------ ENV & OpenAI ------------------
# ------------------ ENV & OpenAI ------------------
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# Always load .env from project root (one level up from backend/)
BASE_DIR = Path(__file__).resolve().parent.parent
dotenv_path = BASE_DIR / ".env"
load_dotenv(dotenv_path=dotenv_path)

OPENAI_API_KEY = os.getenv("OPENAI_sk-proj-t4V3QV8fIY3MNWjDA6pnXoe0_Si0pnI6ryrER6jCwld7QqsobdAHuMxlXO7dEPfLcxZvX4xmuJT3BlbkFJDdn5n2XLUf-r1lxijhaphx5MzA6mVFEBtdGaMBFencxydEd1OHPnMciZQCaDZKf8_Mk2ZgUIAAAPI_KEY")
OPENWEATHER_API_KEY = os.getenv("0b3b780602a22e62c0a3cc295bfd2acf")

# Print diagnostic info
if OPENWEATHER_API_KEY:
    print("✅ OpenWeatherMap key loaded successfully.")
else:
    print("⚠️ WARNING: OPENWEATHER_API_KEY not found in .env file.")

if OPENAI_API_KEY:
    print("✅ OpenAI API key detected.")
else:
    print("❌ ERROR: OPENAI_API_KEY not found in .env file!")

# Initialize OpenAI client safely
client = None
try:
    client = OpenAI(api_key=OPENAI_API_KEY)  # ✅ pass key explicitly
    client.models.list()  # simple validation
    print("✅ OpenAI client initialized successfully.")
except Exception as e:
    print(f"❌ FAILED to initialize OpenAI client: {e}")
    client = None


# ------------------ Flask app ------------------
app = Flask(__name__, template_folder="../frontend/templates", static_folder="../frontend/static")
CORS(app)

# ------------------ Load ML model ------------------
model, tf, meta, device = load_model("backend/models/best_model.pth", "backend/models/metadata.json")
CLASSES = meta["classes"]

# ------------------ Helpers ------------------
def get_weather_for_chatbot(city="Pune, IN"):
    if not OPENWEATHER_API_KEY:
        return "Weather data is unavailable."
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
        response = requests.get(url); response.raise_for_status()
        data = response.json()
        temp = data['main']['temp']; humidity = data['main']['humidity']
        description = data['weather'][0]['description']
        return f"The current weather in {city} is {temp}°C, {humidity}% humidity, with {description}."
    except requests.exceptions.RequestException as e:
        print(f"Weather API error: {e}")
        return "Weather data is unavailable."

def get_openai_response(question, disease):
    if not client:
        return "Sorry, the AI assistant is not configured correctly."
    current_weather = get_weather_for_chatbot("Pune, IN")
    system_prompt = (
        "You are an expert agricultural assistant specializing in pomegranate farming. "
        "Your answers are practical, concise, and helpful to a farmer. "
        "You are fluent in all languages. "
        "Use these advisories: "
        "1) Promote high-yield, pest-resistant varieties. "
        "2) Emphasize drip irrigation & water conservation. "
        "3) Promote IPM (neem oil/pheromone traps before chemicals). "
        "4) Mention checking micronutrients (Zn, S). "
        "5) Consider variable monsoon: drainage & water harvesting."
    )
    user_prompt = (
        f"A farmer has a plant with detected disease: '{disease}'. "
        f"Question: '{question}'. "
        f"Relevant weather: '{current_weather}'."
    )
    try:
        resp = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role":"system","content":system_prompt},
                      {"role":"user","content":user_prompt}],
            temperature=0.7, max_tokens=150
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return "Sorry, I am having trouble connecting to the AI assistant right now."

# ------------- Audio helpers for /stt (Flask) -------------
def to_wav(src_path, dst_path):
    # requires ffmpeg installed and in PATH
    subprocess.run(
        ["ffmpeg","-y","-i",src_path,"-ar","16000","-ac","1","-f","wav",dst_path],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True
    )

_USE_FASTER = False
_whisper_model = None
def load_whisper_model():
    global _whisper_model
    if _whisper_model is not None:
        return _whisper_model
    if _USE_FASTER:
        from faster_whisper import WhisperModel
        _whisper_model = WhisperModel("base", device="cpu", compute_type="int8")
    else:
        import whisper
        _whisper_model = whisper.load_model("base")
    return _whisper_model

def transcribe_wav(path, lang_code="en"):
    m = load_whisper_model()
    if _USE_FASTER:
        segments, info = m.transcribe(path, language=lang_code or None)
        return "".join([s.text for s in segments]).strip()
    else:
        import whisper
        result = m.transcribe(path, language=lang_code or None, fp16=False)
        return (result.get("text") or "").strip()

# ------------------ Routes ------------------
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/health")
def health():
    return jsonify({"ok": True})

@app.route("/predict", methods=["POST"])
def predict():
    img = Image.open(request.files["file"].stream)
    idx, prob, _ = predict_pil_image(model, tf, device, img)
    label = CLASSES[idx]
    return jsonify({"label": label, "confidence": prob})

@app.route("/soil/recommend", methods=["POST"])
def soil_recommend():
    data = request.get_json(force=True)
    return jsonify({"recommendations": recommend(data["soil"])})

@app.route("/crop/recommend", methods=["POST"])
def crop_recommend_route():
    data = request.get_json(force=True)
    recommendation = recommend_crop(data)  # expects {N,P,K,ph,temp,humidity,rainfall}
    return jsonify({"recommendation": recommendation})

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)
    question = data.get("question", "")
    disease = data.get("disease", "Healthy")
    lang = data.get("lang", "en")
    response_text = get_openai_response(question, disease)
    translated = translate_text(response_text, lang)
    return jsonify({"answer": translated})

@app.route("/tts", methods=["POST"])
def tts_route():
    data = request.get_json(force=True)
    return jsonify(tts(data["text"], data.get("lang","en")))

# ---------- NEW robust Flask /stt ----------
@app.route("/stt", methods=["POST"])
def stt_route():
    up = request.files.get("audio") or request.files.get("file")
    lang = request.args.get("lang", "en")
    if not up:
        return jsonify({"text": "", "error": "no_file"}), 400

    with tempfile.TemporaryDirectory() as td:
        src = os.path.join(td, up.filename or "input.bin")
        wav = os.path.join(td, "audio.wav")
        up.save(src)
        try:
            to_wav(src, wav)           # any input → 16kHz mono WAV
        except Exception as e:
            return jsonify({"text": "", "error": f"ffmpeg_failed: {e}"}), 415
        try:
            text = transcribe_wav(wav, lang_code=lang)
        except Exception as e:
            return jsonify({"text": "", "error": f"stt_failed: {e}"}), 500
    return jsonify({"text": text})

@app.route("/irrigation/advice", methods=["POST"])
def irrigation_advice():
    data = request.get_json(force=True)
    moisture = data.get("soil_moisture_pct", 0)
    rain = data.get("rainfall_mm", 0)
    advice = recommend_timing(moisture, rain)
    return jsonify({"advice": advice})

# ------------------ Run ------------------
if __name__ == "__main__":
    # Flask dev server
    app.run(host="0.0.0.0", port=5000, debug=True)
