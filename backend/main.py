from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.prediction import router as prediction_router


app = FastAPI(
    title="Customer Churn Prediction API",
    description="AI-powered customer churn prediction and retention platform",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# API ROUTES
# --------------------------------------------------

app.include_router(prediction_router)


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Customer Churn Prediction API is running",
        "status": "success"
    }


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }