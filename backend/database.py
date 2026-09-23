import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "churn_predictions.db")


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def create_table():
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            gender TEXT,
            senior_citizen INTEGER,
            partner TEXT,
            dependents TEXT,

            tenure_months REAL,
            phone_service TEXT,
            multiple_lines TEXT,
            internet_service TEXT,

            online_security TEXT,
            online_backup TEXT,
            device_protection TEXT,
            tech_support TEXT,
            streaming_tv TEXT,
            streaming_movies TEXT,

            contract TEXT,
            paperless_billing TEXT,
            payment_method TEXT,

            monthly_charges REAL,
            total_charges REAL,

            prediction INTEGER,
            churn_probability REAL,
            churn_percentage REAL,
            risk_level TEXT,
            recommendation TEXT,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()


create_table()