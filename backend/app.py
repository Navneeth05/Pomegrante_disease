# backend/app.py
import os, json, tempfile, subprocess
import requests  # <-- FIX: Moved import to top
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from PIL import Image
from openai import OpenAI
from pathlib import Path

# --- Import your project's other files ---
from src.infer import load_model, predict_pil_image
from src.soil import recommend
from src.crop import recommend_crop
from src.irrigation import recommend_timing
from src.tts_stt import translate_text, tts   # we'll implement stt locally below

# ------------------ ENV & OpenAI ------------------
BASE_DIR = Path(__file__).resolve().parent  # backend/
DATA_FILE = BASE_DIR / "data" / "disease_info.json"

with open(DATA_FILE, "r", encoding="utf-8") as f:
    DISEASE_INFO = json.load(f)

# Always load .env from project root (one level up from backend/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
dotenv_path = PROJECT_ROOT / ".env"
load_dotenv(dotenv_path=dotenv_path)

# --- FIX: Load keys by their VARIABLE NAME, not the key itself ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY") # <-- FIX

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
    client = OpenAI(api_key=OPENAI_API_KEY)
    client.models.list()  # simple validation
    print("✅ OpenAI client initialized successfully.")
except Exception as e:
    print(f"❌ FAILED to initialize OpenAI client: {e}")
    client = None


# ------------------ Flask app ------------------
# --- FIX: Define the app ONLY ONCE ---
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
    lang = request.args.get("lang", "en")

    key = label.strip().lower()
    info = DISEASE_INFO.get(key, {}).get(lang, DISEASE_INFO.get(key, {}).get("en", {}))

    return jsonify({
        "label": label,
        "confidence": prob,
        "treatment": info.get("treatment", ["—"]),
        "prevention": info.get("prevention", ["—"])
    })



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

@app.route("/disease_info", methods=["GET"])
def disease_info_route():
    # query args: ?label=<label>&lang=<en|hi|ta|te|kn>
    label = request.args.get("label", "").strip().lower()
    lang = request.args.get("lang", "en")
    if not label:
        return jsonify({"treatment": ["—"], "prevention": ["—"]})
    info = DISEASE_INFO.get(label, {})
    if not info:
        # fallback: try fuzzy/substring match
        for k in DISEASE_INFO.keys():
            if k in label or label in k:
                info = DISEASE_INFO[k]
                break
    if not info:
        return jsonify({"treatment": ["—"], "prevention": ["—"]})
    # pick requested lang, else English
    res = info.get(lang, info.get("en", {}))
    return jsonify({
        "treatment": res.get("treatment", ["—"]),
        "prevention": res.get("prevention", ["—"])
    })

@app.route("/irrigation/advice", methods=["POST"])
def irrigation_advice():
    data = request.get_json(force=True)
    moisture = data.get("soil_moisture_pct", 0)
    rain = data.get("rainfall_mm", 0)
    advice = recommend_timing(moisture, rain)
    return jsonify({"advice": advice})

# --- FIX: Merged this route into the main app ---
@app.route('/weather/forecast')
def weather_forecast():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    mode = request.args.get('mode', 'forecast')  # 'forecast' or 'onecall'
    
    if not lat or not lon:
        return jsonify({'error': 'lat & lon required'}), 400
    
    # --- FIX: Check the global API key variable ---
    if not OPENWEATHER_API_KEY:
        print("❌ Weather request failed: OPENWEATHER_API_KEY is not set.")
        return jsonify({'error': 'Weather service is not configured'}), 500

    try:
        if mode == 'onecall':
            url = 'https://api.openweathermap.org/data/2.5/onecall'
            params = {'lat': lat, 'lon': lon, 'exclude': 'minutely', 'units': 'metric', 'appid': OPENWEATHER_API_KEY}
        else:
            url = 'https://api.openweathermap.org/data/2.5/forecast'
            params = {'lat': lat, 'lon': lon, 'units': 'metric', 'appid': OPENWEATHER_API_KEY}

        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        return jsonify(resp.json())
    except requests.RequestException as e:
        print(f"Weather API request error: {e}")
        return jsonify({'error': str(e)}), 502

# ------------------ Run ------------------
if __name__ == "__main__":
    # Flask dev server
    # --- FIX: This will now run the correct, single 'app' ---
    app.run(host="0.0.0.0", port=5000, debug=True)
