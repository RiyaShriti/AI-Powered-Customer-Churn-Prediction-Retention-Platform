import os
import joblib
import pandas as pd

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database import get_connection


router = APIRouter(prefix="/api", tags=["Prediction"])


# ==============================
# Load ML Model
# ==============================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "churn_model.pkl")

try:
    model = joblib.load(MODEL_PATH)
    print("Churn model loaded successfully.")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")


# ==============================
# Request Schema
# ==============================

class CustomerData(BaseModel):
    gender: str
    senior_citizen: int
    partner: str
    dependents: str
    tenure_months: float
    phone_service: str
    multiple_lines: str
    internet_service: str
    online_security: str
    online_backup: str
    device_protection: str
    tech_support: str
    streaming_tv: str
    streaming_movies: str
    contract: str
    paperless_billing: str
    payment_method: str
    monthly_charges: float
    total_charges: float


# ==============================
# Predict Churn
# ==============================

@router.post("/predict")
def predict_churn(customer: CustomerData):

    if model is None:
        raise HTTPException(
            status_code=500,
            detail="ML model is not loaded."
        )

    input_data = pd.DataFrame([{
        "Gender": customer.gender,
        "Senior_Citizen": customer.senior_citizen,
        "Partner": customer.partner,
        "Dependents": customer.dependents,
        "Tenure_Months": customer.tenure_months,
        "Phone_Service": customer.phone_service,
        "Multiple_Lines": customer.multiple_lines,
        "Internet_Service": customer.internet_service,
        "Online_Security": customer.online_security,
        "Online_Backup": customer.online_backup,
        "Device_Protection": customer.device_protection,
        "Tech_Support": customer.tech_support,
        "Streaming_TV": customer.streaming_tv,
        "Streaming_Movies": customer.streaming_movies,
        "Contract": customer.contract,
        "Paperless_Billing": customer.paperless_billing,
        "Payment_Method": customer.payment_method,
        "Monthly_Charges": customer.monthly_charges,
        "Total_Charges": customer.total_charges
    }])

    probability = model.predict_proba(input_data)[0][1]
    prediction = model.predict(input_data)[0]

    churn_percentage = probability * 100

    # ==============================
    # Risk Classification
    # ==============================

    if probability >= 0.70:

        risk_level = "High"

        recommendation = (
            "Offer a personalized retention discount, "
            "proactively contact the customer, and "
            "consider offering a long-term contract."
        )

    elif probability >= 0.40:

        risk_level = "Medium"

        recommendation = (
            "Monitor the customer closely and "
            "offer targeted incentives or additional support."
        )

    else:

        risk_level = "Low"

        recommendation = (
            "Customer shows low churn risk. "
            "Maintain regular engagement and service quality."
        )

    # ==============================
    # Save Prediction to Database
    # ==============================

    try:

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO predictions (
                gender,
                senior_citizen,
                partner,
                dependents,
                tenure_months,
                phone_service,
                multiple_lines,
                internet_service,
                online_security,
                online_backup,
                device_protection,
                tech_support,
                streaming_tv,
                streaming_movies,
                contract,
                paperless_billing,
                payment_method,
                monthly_charges,
                total_charges,
                prediction,
                churn_probability,
                churn_percentage,
                risk_level,
                recommendation
            )
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            """,
            (
                customer.gender,
                customer.senior_citizen,
                customer.partner,
                customer.dependents,
                customer.tenure_months,
                customer.phone_service,
                customer.multiple_lines,
                customer.internet_service,
                customer.online_security,
                customer.online_backup,
                customer.device_protection,
                customer.tech_support,
                customer.streaming_tv,
                customer.streaming_movies,
                customer.contract,
                customer.paperless_billing,
                customer.payment_method,
                customer.monthly_charges,
                customer.total_charges,
                int(prediction),
                float(probability),
                round(float(churn_percentage), 2),
                risk_level,
                recommendation
            )
        )

        connection.commit()
        connection.close()

    except Exception as e:

        print(f"Database error: {e}")

    # ==============================
    # API Response
    # ==============================

    return {
        "prediction": int(prediction),
        "churn_probability": round(float(probability), 4),
        "churn_percentage": round(float(churn_percentage), 2),
        "risk_level": risk_level,
        "recommendation": recommendation
    }


# ==============================
# Prediction History
# ==============================

@router.get("/history")
def get_prediction_history():

    try:

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT *
            FROM predictions
            ORDER BY created_at DESC
            """
        )

        rows = cursor.fetchall()

        connection.close()

        return {
            "status": "success",
            "count": len(rows),
            "history": [dict(row) for row in rows]
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Unable to fetch prediction history: {str(e)}"
        )

 # ==============================
# API Status
# ==============================

@router.get("/status")
def get_api_status():

    model_status = model is not None

    database_status = False

    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT 1")

        database_status = True

        connection.close()

    except Exception:
        database_status = False

    return {
        "api": "online",
        "model_loaded": model_status,
        "database_connected": database_status
    }       