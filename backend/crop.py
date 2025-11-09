# backend/src/crop.py
import os
import pickle

MODEL_PATH = os.path.join("backend", "models", "crop_model.pkl")

def _load_model(path):
    try:
        with open(path, "rb") as f:
            return pickle.load(f)
    except FileNotFoundError:
        print(f"[crop] Model file not found: {path}")
    except Exception as e:
        print(f"[crop] Error loading model {path}: {e}")
    return None

_model = _load_model(MODEL_PATH)

def recommend_crop(input_data):
    """
    input_data: dict with features expected by your model (N,P,K,temperature,humidity,ph,rainfall)
    Returns either a predicted label or a heuristic fallback.
    """
    try:
        # If model exists, try to predict
        if _model is not None:
            # Build feature vector in same order used for training
            features = [
                float(input_data.get("N", 0)),
                float(input_data.get("P", 0)),
                float(input_data.get("K", 0)),
                float(input_data.get("temperature", input_data.get("temp", 25))),
                float(input_data.get("humidity", 50)),
                float(input_data.get("ph", 7)),
                float(input_data.get("rainfall", 0)),
            ]
            pred = _model.predict([features])
            return {"recommendation": str(pred[0]), "source": "model"}
    except Exception as e:
        print("[crop] model predict error:", e)

    # Fallback heuristic
    # Very simple heuristic: choose crop based on NPK heavy -> 'maize', balanced -> 'paddy', low nutrients -> 'millet'
    N = float(input_data.get("N", 0))
    P = float(input_data.get("P", 0))
    K = float(input_data.get("K", 0))
    if N + P + K > 200:
        rec = "Maize (high nutrient tolerant)"
    elif N + P + K > 100:
        rec = "Paddy (moderate nutrient requirement)"
    else:
        rec = "Millet (low nutrient requirement)"
    return {"recommendation": rec, "source": "heuristic"}
