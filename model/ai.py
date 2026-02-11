import json


import os
from unittest import result
import uuid
import asyncio
import aiohttp
import logging
import pandas as pd
import ast
import sys
from typing import List, Dict

# --------------------------------------------------
# CONFIG
# --------------------------------------------------
DXGPT_API_KEY = "89d3a50e94de4a3dbb5f4285c21c5777"
DXGPT_URL = "https://dxgpt-apim.azure-api.net/api/diagnose"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("DiagnosisAgent")

# --------------------------------------------------
# PATH CONFIG (🔥 CRITICAL FIX)
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# --------------------------------------------------
# DISEASE ALIAS MAP
# --------------------------------------------------
DISEASE_ALIASES = {
    # Allergy / Skin
    "contact dermatitis": "allergy",
    "skin allergy": "allergy",
    "allergic reaction": "allergy",
    "eczema": "allergy",
    "urticaria": "allergy",
    "rash": "allergy",

    # Respiratory
    "upper respiratory infection": "common cold",
    "viral fever": "influenza",

    # Gastro
    "acid reflux": "gerd",
    "heartburn": "gerd",

    # Neuro
    "tension headache": "migraine",

    # GI
    "food poisoning": "gastroenteritis"
}

# --------------------------------------------------
# MEDICAL KNOWLEDGE BASE
# --------------------------------------------------
class MedicalKnowledgeBase:
    def __init__(self):
        logger.info(f"📂 Loading medical data from: {BASE_DIR}")

        self.desc_df = pd.read_csv(os.path.join(BASE_DIR, "description.csv"))
        self.diet_df = pd.read_csv(os.path.join(BASE_DIR, "diets.csv"))
        self.med_df = pd.read_csv(os.path.join(BASE_DIR, "medications.csv"))
        self.prec_df = pd.read_csv(os.path.join(BASE_DIR, "precautions_df.csv"))
        self.workout_df = pd.read_csv(os.path.join(BASE_DIR, "workout_df.csv"))

        # normalize disease names
        self.desc_df["Disease"] = self.desc_df["Disease"].str.lower()
        self.diet_df["Disease"] = self.diet_df["Disease"].str.lower()
        self.med_df["Disease"] = self.med_df["Disease"].str.lower()
        self.prec_df["Disease"] = self.prec_df["Disease"].str.lower()
        self.workout_df["disease"] = self.workout_df["disease"].str.lower()

    def normalize_disease(self, disease: str) -> str:
        d = disease.strip().lower()

        if d in DISEASE_ALIASES:
            return DISEASE_ALIASES[d]

        for key, val in DISEASE_ALIASES.items():
            if key in d:
                return val

        return d

    def get_description(self, disease: str) -> str:
        d = self.normalize_disease(disease)
        row = self.desc_df[self.desc_df["Disease"] == d]
        return row["Description"].values[0] if not row.empty else ""

    def get_medications(self, disease: str) -> List[str]:
        d = self.normalize_disease(disease)
        row = self.med_df[self.med_df["Disease"] == d]
        return ast.literal_eval(row["Medication"].values[0]) if not row.empty else []

    def get_diet(self, disease: str) -> List[str]:
        d = self.normalize_disease(disease)
        row = self.diet_df[self.diet_df["Disease"] == d]
        return ast.literal_eval(row["Diet"].values[0]) if not row.empty else []

    def get_precautions(self, disease: str) -> List[str]:
        d = self.normalize_disease(disease)
        row = self.prec_df[self.prec_df["Disease"] == d]

        if row.empty:
            return []

        precautions = []
        for col in ["Precaution_1", "Precaution_2", "Precaution_3", "Precaution_4"]:
            if col in row.columns and pd.notna(row[col].values[0]):
                precautions.append(row[col].values[0])

        return precautions

    def get_exercises(self, disease: str) -> List[str]:
        d = self.normalize_disease(disease)
        rows = self.workout_df[self.workout_df["disease"] == d]
        return rows["workout"].dropna().tolist()

    def get_full_plan(self, disease: str) -> Dict:
        return {
            "description": self.get_description(disease),
            "medications": self.get_medications(disease),
            "diet": self.get_diet(disease),
            "precautions": self.get_precautions(disease),
            "exercises": self.get_exercises(disease)
        }

# --------------------------------------------------
# DIAGNOSIS AGENT
# --------------------------------------------------
class DiagnosisAgent:
    def __init__(self):
        self.kb = MedicalKnowledgeBase()

    def calculate_confidence(self, common: List[str], not_common: List[str]) -> float:
        total = len(common) + len(not_common)
        return round(len(common) / total, 2) if total else 0.0

    async def call_dxgpt(self, sentence: str) -> List[Dict]:
        payload = {
            "description": sentence,
            "myuuid": str(uuid.uuid4()),
            "timezone": "Asia/Kolkata",
            "model": "gpt4o",
            "response_mode": "direct",
            "lang": "en"
        }

        headers = {
            "Ocp-Apim-Subscription-Key": DXGPT_API_KEY,
            "Content-Type": "application/json"
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(DXGPT_URL, json=payload, headers=headers) as resp:
                if resp.status != 200:
                    raise RuntimeError(await resp.text())
                data = await resp.json()

        results = []
        for d in data.get("data", [])[:5]:
            confidence = self.calculate_confidence(
                d.get("symptoms_in_common", []),
                d.get("symptoms_not_in_common", [])
            )
            results.append({
                "condition": d.get("diagnosis", "Unknown"),
                "confidence": confidence,
                "matched_symptoms": d.get("symptoms_in_common", []),
                "missing_symptoms": d.get("symptoms_not_in_common", [])
            })

        return sorted(results, key=lambda x: x["confidence"], reverse=True)

    async def diagnose(self, sentence: str) -> Dict:
        diagnoses = await self.call_dxgpt(sentence)

        if not diagnoses:
            return {"error": "No diagnosis returned"}

        top = diagnoses[0]
        plan = self.kb.get_full_plan(top["condition"])

        return {
            "top_diagnosis": {
                "condition": top["condition"],
                "confidence": top["confidence"],
                **plan
            },
            "all_diagnoses": diagnoses
        }

# --------------------------------------------------
# ENTRYPOINT (Node + CLI compatible)
# --------------------------------------------------
if __name__ == "__main__":
    sentence = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else input("Describe symptoms: ")

    agent = DiagnosisAgent()

    async def run():
        result = await agent.diagnose(sentence)
        print(json.dumps(result, indent=2))

    asyncio.run(run())