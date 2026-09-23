import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)


# ============================================================
# 1. PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "Telco_customer_churn.xlsx"
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "backend",
    "churn_model.pkl"
)


# ============================================================
# 2. LOAD DATA
# ============================================================

print("\nLoading dataset...")

df = pd.read_excel(DATA_PATH)

print(f"Dataset shape: {df.shape}")

print("\nFirst 5 rows:")
print(df.head())


# ============================================================
# 3. CLEAN COLUMN NAMES
# ============================================================

df.columns = (
    df.columns
    .str.strip()
    .str.replace(" ", "_")
)


# ============================================================
# 4. CLEAN TOTAL CHARGES
# ============================================================

df["Total_Charges"] = pd.to_numeric(
    df["Total_Charges"],
    errors="coerce"
)


# ============================================================
# 5. TARGET
# ============================================================

TARGET = "Churn_Label"

df[TARGET] = df[TARGET].map({
    "Yes": 1,
    "No": 0
})


# ============================================================
# 6. REMOVE DATA-LEAKAGE / UNNECESSARY COLUMNS
# ============================================================

columns_to_drop = [
    # ID / target leakage columns
    "CustomerID",
    "Churn_Label",
    "Churn_Value",
    "Churn_Score",
    "Churn_Reason",
    "CLTV",

    # Geographic/location columns
    "Country",
    "State",
    "City",
    "Zip_Code",
    "Latitude",
    "Longitude",
    "Lat_Long",
    "Count"
]

X = df.drop(
    columns=columns_to_drop,
    errors="ignore"
)

y = df[TARGET]


# ============================================================
# 7. REMOVE COMPLETELY EMPTY / INVALID TARGET ROWS
# ============================================================

valid_rows = y.notna()

X = X.loc[valid_rows].copy()
y = y.loc[valid_rows].copy()


# ============================================================
# 8. IDENTIFY COLUMN TYPES
# ============================================================

categorical_features = X.select_dtypes(
    include=["object"]
).columns.tolist()

numeric_features = X.select_dtypes(
    exclude=["object"]
).columns.tolist()

print("\nCategorical features:")
print(categorical_features)

print("\nNumeric features:")
print(numeric_features)


# ============================================================
# 9. PREPROCESSING
# ============================================================

numeric_pipeline = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ]
)


categorical_pipeline = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        (
            "onehot",
            OneHotEncoder(
                handle_unknown="ignore"
            )
        )
    ]
)


preprocessor = ColumnTransformer(
    transformers=[
        (
            "numeric",
            numeric_pipeline,
            numeric_features
        ),
        (
            "categorical",
            categorical_pipeline,
            categorical_features
        )
    ]
)


# ============================================================
# 10. TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# ============================================================
# 11. MODELS
# ============================================================

models = {

    "Logistic Regression":
        LogisticRegression(
            max_iter=2000,
            class_weight="balanced"
        ),

    "Random Forest":
        RandomForestClassifier(
            n_estimators=300,
            random_state=42,
            class_weight="balanced",
            n_jobs=-1
        ),

    "Gradient Boosting":
        GradientBoostingClassifier(
            n_estimators=200,
            learning_rate=0.05,
            max_depth=3,
            random_state=42
        )
}


# ============================================================
# 12. TRAIN + EVALUATE
# ============================================================

results = {}

best_model = None
best_model_name = None
best_auc = 0


print("\n" + "=" * 70)
print("MODEL EVALUATION")
print("=" * 70)


for name, model in models.items():

    print(f"\nTraining {name}...")

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", model)
        ]
    )

    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)

    probabilities = pipeline.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    precision = precision_score(
        y_test,
        predictions,
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        zero_division=0
    )

    auc = roc_auc_score(
        y_test,
        probabilities
    )

    results[name] = {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "roc_auc": auc
    }

    print(f"Accuracy : {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall   : {recall:.4f}")
    print(f"F1 Score : {f1:.4f}")
    print(f"ROC-AUC  : {auc:.4f}")

    if auc > best_auc:

        best_auc = auc
        best_model = pipeline
        best_model_name = name


# ============================================================
# 13. SAVE BEST MODEL
# ============================================================

print("\n" + "=" * 70)
print("BEST MODEL")
print("=" * 70)

print(f"Model: {best_model_name}")
print(f"ROC-AUC: {best_auc:.4f}")


joblib.dump(
    best_model,
    MODEL_PATH
)

print("\nModel saved successfully:")
print(MODEL_PATH)