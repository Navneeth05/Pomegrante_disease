import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score

# --- Helper function to save models ---
def save_model(model, filename):
    path = f"backend/models/{filename}"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {path}")

# ==========================================================
# === 1. CROP RECOMMENDATION MODEL ===
# ==========================================================
print("\n--- Training Crop Recommendation Model ---")
try:
    df_crop = pd.read_csv('Crop_recommendation - Copy.csv')
    X_crop = df_crop[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
    y_crop = df_crop['label']
    crop_model = RandomForestClassifier(n_estimators=100, random_state=42)
    crop_model.fit(X_crop, y_crop)
    save_model(crop_model, 'crop_model.pkl')
    print("Crop model trained successfully.")
except FileNotFoundError:
    print("ERROR: 'Crop_recommendation - Copy.csv' not found.")
except Exception as e:
    print(f"ERROR: {e}")


# ==========================================================
# === 2. FERTILIZER RECOMMENDATION MODEL ===
# ==========================================================
print("\n--- Training Fertilizer Recommendation Model ---")
try:
    # We are using data_core - Copy.csv for this model
    df_fert = pd.read_csv('data_core - Copy.csv')
    
    # Get dummies for categorical columns
    df_fert_encoded = pd.get_dummies(df_fert, columns=['Soil Type', 'Crop Type'])
    
    # Define Target (y)
    y_fert = df_fert_encoded['Fertilizer Name']
    
    # Define Features (X)
    X_fert = df_fert_encoded.drop('Fertilizer Name', axis=1)
    
    # Get the list of feature names for the prediction script
    feature_list = X_fert.columns.tolist()

    # Train a Classifier
    fert_model = RandomForestClassifier(n_estimators=100, random_state=42)
    fert_model.fit(X_fert, y_fert)
    
    # Save the model
    save_model(fert_model, 'fertilizer_model.pkl')
    # Save the feature list (Very important!)
    save_model(feature_list, 'fertilizer_features.pkl')
    print("Fertilizer model trained successfully.")
    
except FileNotFoundError:
    print("ERROR: 'data_core - Copy.csv' not found.")
except KeyError as e:
    print(f"KeyError: {e}. A column name is likely wrong.")
except Exception as e:
    print(f"ERROR: {e}")


# ==========================================================
# === 3. IRRIGATION MODEL (SKIPPED) ===
# ==========================================================
print("\n--- Skipping Irrigation Model ---")
print("REASON: No irrigation data (e.g., 'water_mm' column) was found.")

print("\n--- Model training complete. ---")