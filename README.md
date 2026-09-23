# AI-Powered Customer Churn Prediction & Retention Platform

An end-to-end AI/ML web application that predicts customer churn probability, identifies customer risk levels, stores prediction history, and provides data-driven retention recommendations.

The platform combines a machine learning model with a FastAPI backend, React frontend, and SQLite database to provide an interactive customer churn analysis system.

---

## 🚀 Project Overview

Customer churn is a major challenge for subscription-based and service-oriented businesses.

This project uses customer demographic, service usage, contract, billing, and payment information to estimate the probability that a customer may churn.

The system provides:

- Customer churn probability prediction
- Low / Medium / High churn risk classification
- Retention recommendations
- Prediction history
- Churn analytics dashboard
- Machine learning model comparison
- API and database health monitoring
- Interactive React dashboard
- Persistent SQLite prediction storage

---

## ✨ Key Features

### 🤖 AI-Powered Churn Prediction

The platform uses machine learning to predict whether a customer is likely to churn.

The prediction API returns:

- Churn prediction
- Churn probability
- Churn percentage
- Risk level
- Retention recommendation

### 📊 Customer Risk Classification

Customers are classified into three risk categories:

| Churn Probability | Risk Level |
|-------------------|------------|
| `< 40%` | Low |
| `40% – 69%` | Medium |
| `≥ 70%` | High |

### 💡 Retention Recommendations

The system generates a recommendation based on the predicted churn risk so that businesses can identify customers who may require retention efforts.

### 📋 Prediction History

Every prediction is stored in a SQLite database and displayed through the dashboard.

The history section provides information such as:

- Prediction ID
- Customer characteristics
- Churn prediction
- Churn probability
- Risk level
- Recommendation
- Prediction timestamp

### 📈 Analytics Dashboard

The analytics section visualizes prediction results using interactive charts.

It provides:

- Risk-level distribution
- Churn vs. non-churn distribution
- Prediction statistics

### 🧠 Model Performance

The project evaluates multiple machine learning algorithms:

- Logistic Regression
- Random Forest
- Gradient Boosting

The models are compared using:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

### 🔌 API Status Monitoring

The dashboard provides real-time backend status information including:

- API availability
- Machine learning model status
- Database connectivity
- Backend port

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │      React Frontend     │
                    │                         │
                    │  Prediction Dashboard   │
                    │  History                 │
                    │  Analytics               │
                    │  Model Performance      │
                    │  API Status              │
                    └────────────┬────────────┘
                                 │
                                 │ HTTP / REST API
                                 ▼
                    ┌─────────────────────────┐
                    │     FastAPI Backend     │
                    │                         │
                    │  /api/predict           │
                    │  /api/history           │
                    │  /api/status            │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌─────────────────┐       ┌─────────────────┐
          │ ML Model        │       │ SQLite Database │
          │                 │       │                 │
          │ Gradient Boosting│      │ Prediction      │
          │ Pipeline        │       │ History         │
          └─────────────────┘       └─────────────────┘

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Recharts
- Lucide React

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Database
- SQLite

### Development Tools
- Git
- GitHub
- VS Code

## 🧠 Machine Learning Pipeline

The machine learning pipeline used in this project follows these steps:

```text
Telco Customer Churn Dataset
          ↓
Data Loading
          ↓
Data Cleaning & Preprocessing
          ↓
Feature Selection
          ↓
Handle Missing Values
          ↓
Categorical Encoding
          ↓
Numerical Feature Scaling
          ↓
Train-Test Split
          ↓
Model Training
          ↓
Model Evaluation
          ↓
Model Comparison
          ↓
Best Model Selection
          ↓
Model Serialization
          ↓
FastAPI Prediction API

### Pipeline Steps

1. **Data Loading**

   The Telco Customer Churn dataset is loaded from the Excel file.

2. **Data Cleaning**

   Missing and inconsistent values are handled before model training.

3. **Feature Selection**

   Customer-identification, geographic, target-leakage, and unnecessary fields are excluded.

4. **Preprocessing**

   - Numerical features → median imputation + scaling
   - Categorical features → most-frequent imputation + one-hot encoding

5. **Train-Test Split**

   The dataset is divided into training and testing sets using a stratified split.

6. **Model Training**

   Multiple classification models are trained:

   - Logistic Regression
   - Random Forest
   - Gradient Boosting

7. **Model Evaluation**

   Models are evaluated using:

   - Accuracy
   - Precision
   - Recall
   - F1 Score
   - ROC-AUC

8. **Model Selection**

   The models are compared and the model with the highest ROC-AUC is selected.

9. **Model Serialization**

   The trained model pipeline is saved as:

   `backend/churn_model.pkl`

10. **Prediction API**

    The saved model is loaded by the FastAPI backend and used to generate predictions from customer data.

    ## 📚 Dataset

The project uses the **Telco Customer Churn dataset**, stored in:

`data/Telco_customer_churn.xlsx`

The dataset contains **7,043 customer records and 33 columns** covering customer demographics, services, contracts, billing information, and churn-related attributes.

### Dataset Features

The dataset includes information related to:

- Customer demographics
- Customer tenure
- Phone and internet services
- Online security and backup services
- Device protection
- Technical support
- Streaming services
- Contract type
- Paperless billing
- Payment method
- Monthly charges
- Total charges
- Churn status

### Target Variable

The target variable is **Churn Label**.

- `Yes` → Customer churned
- `No` → Customer stayed

### Preprocessing

Before model training, the data pipeline performs:

- Missing-value handling
- Numerical feature scaling
- Categorical feature encoding
- Target-label conversion
- Removal of customer-identification fields
- Removal of target-leakage fields
- Removal of unnecessary geographic fields

## 🧪 Machine Learning Models

Three classification algorithms were trained and evaluated for customer churn prediction:

### 1. Logistic Regression

A classification algorithm used as a baseline model for predicting customer churn.

**Performance:**

- Accuracy: `74.31%`
- Precision: `51.05%`
- Recall: `78.07%`
- F1 Score: `61.73%`
- ROC-AUC: `84.88%`

### 2. Random Forest

An ensemble learning algorithm that combines multiple decision trees to make predictions.

**Performance:**

- Accuracy: `77.64%`
- Precision: `56.97%`
- Recall: `64.44%`
- F1 Score: `60.48%`
- ROC-AUC: `83.41%`

### 3. Gradient Boosting

An ensemble learning algorithm that builds models sequentially to improve prediction performance.

**Performance:**

- Accuracy: `79.91%`
- Precision: `64.72%`
- Recall: `53.48%`
- F1 Score: `58.57%`
- ROC-AUC: `85.29%`

### Model Comparison

| Model | Accuracy | Precision | Recall | F1 Score | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 74.31% | 51.05% | 78.07% | 61.73% | 84.88% |
| Random Forest | 77.64% | 56.97% | 64.44% | 60.48% | 83.41% |
| Gradient Boosting | 79.91% | 64.72% | 53.48% | 58.57% | 85.29% |

### Selected Model

The **Gradient Boosting** model achieved the highest ROC-AUC score of **85.29%** among the evaluated models and was saved for use in the prediction API.

The trained model pipeline is stored at:

`backend/churn_model.pkl`

## 📊 Model Comparison

The trained models were compared using multiple classification metrics:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

| Model | Accuracy | Precision | Recall | F1 Score | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 74.31% | 51.05% | 78.07% | 61.73% | 84.88% |
| Random Forest | 77.64% | 56.97% | 64.44% | 60.48% | 83.41% |
| Gradient Boosting | 79.91% | 64.72% | 53.48% | 58.57% | 85.29% |

### Selected Model

The **Gradient Boosting** model achieved the highest ROC-AUC score of **85.29%** among the evaluated models.

The trained model pipeline is saved as:

`backend/churn_model.pkl`

This serialized pipeline is loaded by the FastAPI backend to generate customer churn predictions.

## 🔌 API Endpoints

The backend is built using **FastAPI** and provides the following REST API endpoints:

### Root Endpoint

`GET /`

Returns a message confirming that the Customer Churn Prediction API is running.

### Health Check

`GET /health`

Checks whether the backend API is running.

### Churn Prediction

`POST /api/predict`

Accepts customer information and returns:

- Churn prediction
- Churn probability
- Churn percentage
- Risk level
- Retention recommendation

### Prediction History

`GET /api/history`

Retrieves previously stored churn predictions from the SQLite database.

### API Status

`GET /api/status`

Returns the current status of:

- API
- Machine learning model
- Database connection

### API Base URL

`http://127.0.0.1:8001`

## 🐍 Backend Setup

The backend is developed using **Python** and **FastAPI**.

It handles:

- Customer churn prediction
- Machine learning model loading
- Prediction history management
- SQLite database operations
- API health monitoring
- Model and database status checking

The backend uses **Uvicorn** as the ASGI server and provides REST API endpoints for communication with the React frontend.

### Backend Technologies

- Python
- FastAPI
- Uvicorn
- Pydantic
- Scikit-learn
- Pandas
- Joblib
- SQLite

### Backend Server

The FastAPI backend runs locally on:

`http://127.0.0.1:8001`

API documentation is available at:

`http://127.0.0.1:8001/docs`

## ⚛️ Frontend Setup

The frontend is developed using **React** and **Vite**.

It provides an interactive dashboard for:

- Customer churn prediction
- Customer input management
- Prediction results
- Prediction history
- Churn analytics
- Model performance comparison
- API status monitoring

### Frontend Technologies

- React
- Vite
- JavaScript
- CSS
- Recharts
- Lucide React

### Frontend Application

The React frontend communicates with the FastAPI backend through REST API requests.

The application runs locally using the Vite development server.

The frontend provides a responsive dashboard interface for interacting with the customer churn prediction system.

## 🔄 Running the Complete Application

The application consists of two main components:

- **React Frontend**
- **FastAPI Backend**

Both services need to run simultaneously for the complete application to work.

### Backend

The FastAPI backend runs on:

`http://127.0.0.1:8001`

It provides the machine learning prediction API, prediction history, and system status.

### Frontend

The React frontend runs using the Vite development server.

It communicates with the FastAPI backend through REST API requests.

### Application Flow

```text
User
  ↓
React Frontend
  ↓
FastAPI Backend
  ↓
Machine Learning Model
  ↓
Churn Prediction
  ↓
SQLite Database
  ↓
Prediction Result
  ↓
React Dashboard

## 🖥️ Application Pages

The platform provides five main dashboard pages:

### 1. Predict Churn

Allows users to enter customer information and generate an AI-powered churn prediction.

The page displays:

- Churn probability
- Churn percentage
- Risk level
- Retention recommendation

### 2. Prediction History

Displays previously generated churn predictions stored in the SQLite database.

Users can review:

- Prediction records
- Churn probability
- Risk level
- Recommendations
- Prediction timestamps

### 3. Analytics

Provides visual insights into the prediction history using interactive charts.

The page includes:

- Risk-level distribution
- Churn vs. non-churn distribution
- Prediction statistics

### 4. Model Performance

Displays the performance of the machine learning models evaluated during training.

The page compares:

- Logistic Regression
- Random Forest
- Gradient Boosting

using:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

### 5. API Status

Provides information about the current backend system status.

It displays:

- API status
- Machine learning model status
- Database connection status
- Backend port

## 🔐 Data & Model Considerations

The machine learning pipeline removes customer-identification fields and target-leakage fields before model training.

The data preprocessing pipeline handles missing values, categorical encoding, and numerical feature scaling.

The trained model is stored as a serialized machine learning pipeline and loaded by the FastAPI backend for prediction.

The prediction system is designed as a decision-support tool and should be combined with appropriate business context when used for real-world customer retention decisions.

## 📸 Screenshots

Screenshots of the application are stored in the `screenshots/` directory.

The screenshots showcase the main features of the platform, including:

- Customer Churn Prediction Dashboard
- Prediction Results
- Prediction History
- Analytics Dashboard
- Model Performance
- API Status

## 🎯 Project Objective

The objective of this project is to develop an end-to-end AI-powered customer churn prediction and retention platform.

The system integrates:

- Machine Learning
- FastAPI
- React
- SQLite
- Data Visualization

The platform helps analyze customer information, estimate churn probability, classify customer risk, provide retention recommendations, and maintain prediction history through an interactive web dashboard.

## 👩‍💻 Author

**Riya Shriti**

B.Tech Computer Science Engineering  
Specialization: Artificial Intelligence & Machine Learning