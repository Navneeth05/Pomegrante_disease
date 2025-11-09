# backend/stt_routes.py
from fastapi import APIRouter, UploadFile, File, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import tempfile, os, subprocess

router = APIRouter()

# ----- helpers -----
def to_wav(src_path, dst_path):
    subprocess.run(
        ["ffmpeg","-y","-i",src_path,"-ar","16000","-ac","1","-f","wav",dst_path],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True
    )

USE_FASTER = False
_model = None
def load_model():
    global _model
    if _model is not None: return _model
    if USE_FASTER:
        from faster_whisper import WhisperModel
        _model = WhisperModel("base", device="cpu", compute_type="int8")
    else:
        import whisper
        _model = whisper.load_model("base")
    return _model

def transcribe(path, lang_code="en"):
    m = load_model()
    if USE_FASTER:
        segments, info = m.transcribe(path, language=lang_code or None)
        return "".join([s.text for s in segments]).strip()
    else:
        import whisper
        result = m.transcribe(path, language=lang_code or None, fp16=False)
        return (result.get("text") or "").strip()

@router.post("/stt_echo")
async def stt_echo(audio: UploadFile | None = File(default=None),
                   file: UploadFile | None = File(default=None)):
    up = audio or file
    if not up:
        return JSONResponse({"text": "", "error": "no_file"}, status_code=400)
    return {"text": "Echo OK – audio received"}

@router.post("/stt")
async def stt(audio: UploadFile | None = File(default=None),
              file: UploadFile | None = File(default=None),
              lang: str = "en"):
    up = audio or file
    if not up:
        return JSONResponse({"text":"", "error":"no_file"}, status_code=400)
    with tempfile.TemporaryDirectory() as td:
        src = os.path.join(td, up.filename or "input.bin")
        wav = os.path.join(td, "audio.wav")
        with open(src, "wb") as f:
            f.write(await up.read())
        try:
            to_wav(src, wav)
        except Exception as e:
            return JSONResponse({"text":"", "error":f"ffmpeg_failed: {e}"}, status_code=415)
        try:
            text = transcribe(wav, lang_code=lang)
        except Exception as e:
            return JSONResponse({"text":"", "error":f"stt_failed: {e}"}, status_code=500)
    return {"text": text}
