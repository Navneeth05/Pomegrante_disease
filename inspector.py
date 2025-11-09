import pandas as pd

print("--- Inspecting CSV Files ---")

try:
    print("\n[1] Crop_recommendation - Copy.csv")
    df_crop = pd.read_csv('Crop_recommendation - Copy.csv')
    print("Columns:", df_crop.columns.tolist())
except Exception as e:
    print(f"ERROR: {e}")

try:
    print("\n[2] data_core - Copy.csv")
    df_core = pd.read_csv('data_core - Copy.csv')
    print("Columns:", df_core.columns.tolist())
except Exception as e:
    print(f"ERROR: {e}")
    
try:
    print("\n[3] Nutrient (1).csv")
    df_nutrient = pd.read_csv('Nutrient (1).csv')
    print("Columns:", df_nutrient.columns.tolist())
except Exception as e:
    print(f"ERROR: {e}")

print("\n--- Inspection Complete ---")