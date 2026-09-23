import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  BrainCircuit,
  History,
  BarChart3,
  ShieldCheck,
  Activity,
  Users,
  AlertTriangle,
  Sparkles,
  Play,
  CheckCircle2,
  Loader2,
  Zap,
  RefreshCw,
  ArrowLeft,
  Server,
  Database,
  Cpu,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import "./styles.css";


/* ============================================================
   API CONFIGURATION
============================================================ */

const API_BASE_URL = "http://127.0.0.1:8001/api";

const PREDICT_URL = `${API_BASE_URL}/predict`;
const HISTORY_URL = `${API_BASE_URL}/history`;
const STATUS_URL = `${API_BASE_URL}/status`;


/* ============================================================
   INITIAL FORM
============================================================ */

const initialForm = {
  gender: "Female",
  senior_citizen: 0,
  partner: "Yes",
  dependents: "No",

  tenure_months: 12,

  phone_service: "Yes",
  multiple_lines: "No",
  internet_service: "Fiber optic",

  online_security: "No",
  online_backup: "No",
  device_protection: "No",
  tech_support: "No",

  streaming_tv: "No",
  streaming_movies: "No",

  contract: "Month-to-month",

  paperless_billing: "Yes",
  payment_method: "Electronic check",

  monthly_charges: 70,
  total_charges: 840,
};


/* ============================================================
   APP
============================================================ */

function App() {

  const [formData, setFormData] = useState(initialForm);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState("predict");

  /* HISTORY */
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  /* API STATUS */
  const [apiStatus, setApiStatus] = useState(null);
  const [apiStatusLoading, setApiStatusLoading] = useState(false);
  const [apiStatusError, setApiStatusError] = useState("");


  /* ==========================================================
     FORM CHANGE
  ========================================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        name === "senior_citizen" ||
        name === "tenure_months" ||
        name === "monthly_charges" ||
        name === "total_charges"
          ? Number(value)
          : value,
    }));
  };


  /* ==========================================================
     PREDICT CHURN
  ========================================================== */

  const predictChurn = async (e) => {

    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {

      const response = await fetch(PREDICT_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail || "Prediction failed"
        );
      }

      setResult(data);

    } catch (error) {

      setResult({
        error:
          error.message ||
          "Unable to connect to prediction API.",
      });

    } finally {

      setLoading(false);
    }
  };


  /* ==========================================================
     RESET FORM
  ========================================================== */

  const resetForm = () => {

    setFormData(initialForm);

    setResult(null);
  };


  /* ==========================================================
     FETCH HISTORY
  ========================================================== */

  const fetchHistory = async () => {

    setHistoryLoading(true);

    setHistoryError("");

    try {

      const response = await fetch(HISTORY_URL);

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Unable to fetch prediction history."
        );
      }

      setHistory(data.history || []);

    } catch (error) {

      setHistoryError(
        error.message ||
        "Unable to connect to history API."
      );

    } finally {

      setHistoryLoading(false);
    }
  };


  /* ==========================================================
     FETCH API STATUS
  ========================================================== */

  const fetchApiStatus = async () => {

    setApiStatusLoading(true);

    setApiStatusError("");

    try {

      const response = await fetch(STATUS_URL);

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Unable to fetch API status."
        );
      }

      setApiStatus(data);

    } catch (error) {

      setApiStatusError(
        error.message ||
        "Unable to connect to API."
      );

    } finally {

      setApiStatusLoading(false);
    }
  };


  /* ==========================================================
     LOAD DATA WHEN PAGES OPEN
  ========================================================== */

  useEffect(() => {

    if (
      activePage === "history" ||
      activePage === "analytics"
    ) {

      fetchHistory();
    }

    if (activePage === "status") {

      fetchApiStatus();
    }

  }, [activePage]);


  /* ==========================================================
     PREDICTION PAGE
  ========================================================== */

  const renderPredictionPage = () => {

    return (
      <>

        {/* HERO */}

        <section className="hero-section">

          <div>

            <div className="eyebrow">

              <Sparkles size={15} />

              AI-POWERED ANALYSIS

            </div>

            <h2>
              Predict customer churn risk
            </h2>

            <p>
              Enter customer information below to estimate
              churn probability and receive an AI-powered
              retention recommendation.
            </p>

          </div>

        </section>


        {/* STATS */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon purple">
              <BrainCircuit size={21} />
            </div>

            <div>

              <span className="stat-label">
                MODEL
              </span>

              <strong>
                Gradient Boosting
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              <BarChart3 size={21} />
            </div>

            <div>

              <span className="stat-label">
                ROC-AUC
              </span>

              <strong>
                85.29%
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <AlertTriangle size={21} />
            </div>

            <div>

              <span className="stat-label">
                HIGH RISK
              </span>

              <strong>
                ≥ 70%
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <Users size={21} />
            </div>

            <div>

              <span className="stat-label">
                TEST SAMPLES
              </span>

              <strong>
                1,409
              </strong>

            </div>

          </div>

        </section>


        {/* DASHBOARD */}

        <section className="dashboard-grid">


          {/* CUSTOMER FORM */}

          <div className="card prediction-card">

            <div className="card-header">

              <div>

                <div className="card-title">

                  <Users size={20} />

                  Customer Information

                </div>

                <p>
                  Provide the customer's service and
                  billing information.
                </p>

              </div>

            </div>


            <form onSubmit={predictChurn}>


              {/* BASIC INFORMATION */}

              <div className="form-section">

                <h3>
                  Basic Information
                </h3>


                <div className="form-grid">


                  <div className="form-group">

                    <label>
                      Gender
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >

                      <option value="Female">
                        Female
                      </option>

                      <option value="Male">
                        Male
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Senior Citizen
                    </label>

                    <select
                      name="senior_citizen"
                      value={formData.senior_citizen}
                      onChange={handleChange}
                    >

                      <option value={0}>
                        No
                      </option>

                      <option value={1}>
                        Yes
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Partner
                    </label>

                    <select
                      name="partner"
                      value={formData.partner}
                      onChange={handleChange}
                    >

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Dependents
                    </label>

                    <select
                      name="dependents"
                      value={formData.dependents}
                      onChange={handleChange}
                    >

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* SERVICE DETAILS */}

              <div className="form-section">

                <h3>
                  Service Details
                </h3>


                <div className="form-grid">


                  <div className="form-group">

                    <label>
                      Tenure (Months)
                    </label>

                    <input
                      type="number"
                      name="tenure_months"
                      min="0"
                      value={formData.tenure_months}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Phone Service
                    </label>

                    <select
                      name="phone_service"
                      value={formData.phone_service}
                      onChange={handleChange}
                    >

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Multiple Lines
                    </label>

                    <select
                      name="multiple_lines"
                      value={formData.multiple_lines}
                      onChange={handleChange}
                    >

                      <option value="No">
                        No
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No phone service">
                        No phone service
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Internet Service
                    </label>

                    <select
                      name="internet_service"
                      value={formData.internet_service}
                      onChange={handleChange}
                    >

                      <option value="DSL">
                        DSL
                      </option>

                      <option value="Fiber optic">
                        Fiber optic
                      </option>

                      <option value="No">
                        No
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Online Security
                    </label>

                    <select
                      name="online_security"
                      value={formData.online_security}
                      onChange={handleChange}
                    >

                      <option value="No">
                        No
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No internet service">
                        No internet service
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Online Backup
                    </label>

                    <select
                      name="online_backup"
                      value={formData.online_backup}
                      onChange={handleChange}
                    >

                      <option value="No">
                        No
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No internet service">
                        No internet service
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Device Protection
                    </label>

                    <select
                      name="device_protection"
                      value={formData.device_protection}
                      onChange={handleChange}
                    >

                      <option value="No">
                        No
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No internet service">
                        No internet service
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Tech Support
                    </label>

                    <select
                      name="tech_support"
                      value={formData.tech_support}
                      onChange={handleChange}
                    >

                      <option value="No">
                        No
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No internet service">
                        No internet service
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Streaming TV
                    </label>

                    <select
                      name="streaming_tv"
                      value={formData.streaming_tv}
                      onChange={handleChange}
                    >

                      <option value="No">
                        No
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No internet service">
                        No internet service
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Streaming Movies
                    </label>

                    <select
                      name="streaming_movies"
                      value={formData.streaming_movies}
                      onChange={handleChange}
                    >

                      <option value="No">
                        No
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No internet service">
                        No internet service
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* BILLING */}

              <div className="form-section">

                <h3>
                  Contract & Billing
                </h3>


                <div className="form-grid">


                  <div className="form-group">

                    <label>
                      Contract
                    </label>

                    <select
                      name="contract"
                      value={formData.contract}
                      onChange={handleChange}
                    >

                      <option value="Month-to-month">
                        Month-to-month
                      </option>

                      <option value="One year">
                        One year
                      </option>

                      <option value="Two year">
                        Two year
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Paperless Billing
                    </label>

                    <select
                      name="paperless_billing"
                      value={formData.paperless_billing}
                      onChange={handleChange}
                    >

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Payment Method
                    </label>

                    <select
                      name="payment_method"
                      value={formData.payment_method}
                      onChange={handleChange}
                    >

                      <option value="Electronic check">
                        Electronic check
                      </option>

                      <option value="Mailed check">
                        Mailed check
                      </option>

                      <option value="Bank transfer (automatic)">
                        Bank transfer (automatic)
                      </option>

                      <option value="Credit card (automatic)">
                        Credit card (automatic)
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Monthly Charges ($)
                    </label>

                    <input
                      type="number"
                      name="monthly_charges"
                      min="0"
                      step="0.01"
                      value={formData.monthly_charges}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Total Charges ($)
                    </label>

                    <input
                      type="number"
                      name="total_charges"
                      min="0"
                      step="0.01"
                      value={formData.total_charges}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={resetForm}
                >

                  Reset

                </button>


                <button
                  type="submit"
                  className="primary-btn"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="spin"
                      />

                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play size={17} />

                      Predict Churn
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>


          {/* RESULT */}

          <div className="card result-card">

            <div className="card-header">

              <div>

                <div className="card-title">

                  <Activity size={20} />

                  Prediction Result

                </div>

                <p>
                  AI-generated churn risk assessment.
                </p>

              </div>

            </div>


            {!result && (

              <div className="empty-result">

                <div className="empty-icon">

                  <Zap size={30} />

                </div>

                <h3>
                  Ready for analysis
                </h3>

                <p>
                  Complete the customer information
                  and click <strong>Predict Churn</strong>
                  to generate a risk assessment.
                </p>

              </div>

            )}


            {result?.error && (

              <div className="error-box">

                <AlertTriangle size={22} />

                <div>

                  <strong>
                    Prediction failed
                  </strong>

                  <p>
                    {result.error}
                  </p>

                </div>

              </div>

            )}


            {result && !result.error && (

              <div className="result-content">

                <div className="probability-circle">

                  <span>
                    {result.churn_percentage}%
                  </span>

                  <small>
                    CHURN RISK
                  </small>

                </div>


                <div
                  className={`risk-badge ${result.risk_level.toLowerCase()}`}
                >

                  {result.risk_level === "High" && (
                    <AlertTriangle size={17} />
                  )}

                  {result.risk_level === "Medium" && (
                    <Activity size={17} />
                  )}

                  {result.risk_level === "Low" && (
                    <CheckCircle2 size={17} />
                  )}

                  {result.risk_level} Risk

                </div>


                <div className="prediction-summary">

                  <span>
                    Model prediction
                  </span>

                  <strong>

                    {result.prediction === 1
                      ? "Customer likely to churn"
                      : "Customer likely to stay"}

                  </strong>

                </div>


                <div className="recommendation-box">

                  <div className="recommendation-title">

                    <Sparkles size={17} />

                    Retention Recommendation

                  </div>

                  <p>
                    {result.recommendation}
                  </p>

                </div>


                <div className="model-note">

                  <ShieldCheck size={16} />

                  Prediction generated using the
                  trained Gradient Boosting model.

                </div>

              </div>

            )}

          </div>

        </section>

      </>
    );
  };


  /* ==========================================================
     HISTORY PAGE
  ========================================================== */

  const renderHistoryPage = () => {

    return (

      <section className="card prediction-card">

        <div className="card-header">

          <div>

            <div className="card-title">

              <History size={20} />

              Prediction History

            </div>

            <p>
              Review previous customer churn predictions
              stored in the SQLite database.
            </p>

          </div>


          <button
            className="secondary-btn"
            onClick={fetchHistory}
            disabled={historyLoading}
          >

            {historyLoading ? (
              <>
                <Loader2
                  size={16}
                  className="spin"
                />

                Loading...
              </>
            ) : (
              <>
                <RefreshCw size={16} />

                Refresh
              </>
            )}

          </button>

        </div>


        {historyError && (

          <div className="error-box">

            <AlertTriangle size={22} />

            <div>

              <strong>
                Unable to load history
              </strong>

              <p>
                {historyError}
              </p>

            </div>

          </div>

        )}


        {historyLoading && !historyError && (

          <div className="empty-result">

            <Loader2
              size={30}
              className="spin"
            />

            <h3>
              Loading prediction history...
            </h3>

          </div>

        )}


        {!historyLoading &&
          !historyError &&
          history.length === 0 && (

            <div className="empty-result">

              <div className="empty-icon">

                <History size={30} />

              </div>

              <h3>
                No predictions yet
              </h3>

              <p>
                Make a churn prediction first.
                Your results will appear here.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  setActivePage("predict")
                }
              >

                <ArrowLeft size={16} />

                Make Prediction

              </button>

            </div>

          )}


        {!historyLoading &&
          !historyError &&
          history.length > 0 && (

            <div className="history-table-wrapper">

              <table className="history-table">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Contract</th>
                    <th>Internet</th>
                    <th>Tenure</th>
                    <th>Monthly</th>
                    <th>Churn Risk</th>
                    <th>Risk Level</th>
                    <th>Prediction</th>
                    <th>Date</th>

                  </tr>

                </thead>


                <tbody>

                  {history.map((item) => (

                    <tr key={item.id}>

                      <td>
                        #{item.id}
                      </td>

                      <td>
                        {item.contract}
                      </td>

                      <td>
                        {item.internet_service}
                      </td>

                      <td>
                        {item.tenure_months} mo
                      </td>

                      <td>
                        $
                        {Number(
                          item.monthly_charges
                        ).toFixed(2)}
                      </td>

                      <td>

                        <strong>
                          {item.churn_percentage}%
                        </strong>

                      </td>

                      <td>

                        <span
                          className={`risk-badge-table ${item.risk_level.toLowerCase()}`}
                        >
                          {item.risk_level}
                        </span>

                      </td>

                      <td>

                        {item.prediction === 1 ? (

                          <span className="prediction-churn">
                            Churn
                          </span>

                        ) : (

                          <span className="prediction-stay">
                            Stay
                          </span>

                        )}

                      </td>

                      <td>

                        {item.created_at
                          ? new Date(
                              item.created_at.replace(
                                " ",
                                "T"
                              )
                            ).toLocaleString()
                          : "—"}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </section>
    );
  };


  /* ==========================================================
     ANALYTICS PAGE
  ========================================================== */

  const renderAnalyticsPage = () => {

    const totalPredictions = history.length;

    const churnCount = history.filter(
      (item) => Number(item.prediction) === 1
    ).length;

    const stayCount =
      totalPredictions - churnCount;

    const highRisk = history.filter(
      (item) => item.risk_level === "High"
    ).length;

    const mediumRisk = history.filter(
      (item) => item.risk_level === "Medium"
    ).length;

    const lowRisk = history.filter(
      (item) => item.risk_level === "Low"
    ).length;

    const averageRisk =
      totalPredictions > 0
        ? (
            history.reduce(
              (sum, item) =>
                sum + Number(item.churn_percentage || 0),
              0
            ) / totalPredictions
          ).toFixed(2)
        : "0.00";


    const riskData = [
      {
        name: "High Risk",
        value: highRisk,
      },
      {
        name: "Medium Risk",
        value: mediumRisk,
      },
      {
        name: "Low Risk",
        value: lowRisk,
      },
    ];


    const predictionData = [
      {
        name: "Churn",
        value: churnCount,
      },
      {
        name: "Stay",
        value: stayCount,
      },
    ];


    const PIE_COLORS = [
      "#ef4444",
      "#f59e0b",
      "#22c55e",
    ];


    return (

      <div className="analytics-page">


        {/* ANALYTICS STATS */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">
              <Activity size={21} />
            </div>

            <div>

              <span className="stat-label">
                TOTAL PREDICTIONS
              </span>

              <strong>
                {totalPredictions}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <AlertTriangle size={21} />
            </div>

            <div>

              <span className="stat-label">
                HIGH RISK
              </span>

              <strong>
                {highRisk}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon purple">
              <BarChart3 size={21} />
            </div>

            <div>

              <span className="stat-label">
                AVG CHURN RISK
              </span>

              <strong>
                {averageRisk}%
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <CheckCircle2 size={21} />
            </div>

            <div>

              <span className="stat-label">
                STAY PREDICTIONS
              </span>

              <strong>
                {stayCount}
              </strong>

            </div>

          </div>

        </section>


        {totalPredictions === 0 ? (

          <div className="card analytics-empty">

            <div className="empty-icon">
              <BarChart3 size={30} />
            </div>

            <h3>
              No analytics data yet
            </h3>

            <p>
              Make at least one churn prediction
              to populate the analytics dashboard.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setActivePage("predict")
              }
            >

              <Play size={16} />

              Make Prediction

            </button>

          </div>

        ) : (

          <div className="analytics-grid">


            {/* RISK DISTRIBUTION */}

            <div className="card analytics-card">

              <div className="card-header">

                <div>

                  <div className="card-title">

                    <BarChart3 size={20} />

                    Risk Distribution

                  </div>

                  <p>
                    Distribution of customer risk levels.
                  </p>

                </div>

              </div>


              <div className="chart-container">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      outerRadius={105}
                      dataKey="value"
                      label={({ name, value }) =>
                        value > 0
                          ? `${name}: ${value}`
                          : ""
                      }
                      labelLine={false}
                    >

                      {riskData.map(
                        (entry, index) => (

                          <Cell
                            key={`risk-${index}`}
                            fill={
                              PIE_COLORS[index]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>


            {/* PREDICTION DISTRIBUTION */}

            <div className="card analytics-card">

              <div className="card-header">

                <div>

                  <div className="card-title">

                    <Activity size={20} />

                    Prediction Distribution

                  </div>

                  <p>
                    Churn versus stay predictions.
                  </p>

                </div>

              </div>


              <div className="chart-container">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={predictionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={105}
                      dataKey="value"
                      label={({ name, value }) =>
                        value > 0
                          ? `${name}: ${value}`
                          : ""
                      }
                      labelLine={false}
                    >

                      {predictionData.map(
                        (entry, index) => (

                          <Cell
                            key={`prediction-${index}`}
                            fill={
                              index === 0
                                ? "#ef4444"
                                : "#22c55e"
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        )}

      </div>
    );
  };


  /* ==========================================================
     MODEL PERFORMANCE PAGE
  ========================================================== */

  const renderModelPerformancePage = () => {

    const models = [

      {
        name: "Logistic Regression",
        accuracy: "74.31%",
        precision: "51.05%",
        recall: "78.07%",
        f1: "61.73%",
        rocAuc: "84.88%",
        selected: false,
      },

      {
        name: "Random Forest",
        accuracy: "77.64%",
        precision: "56.97%",
        recall: "64.44%",
        f1: "60.48%",
        rocAuc: "83.41%",
        selected: false,
      },

      {
        name: "Gradient Boosting",
        accuracy: "79.91%",
        precision: "64.72%",
        recall: "53.48%",
        f1: "58.57%",
        rocAuc: "85.29%",
        selected: true,
      },

    ];


    return (

      <div className="model-performance-page">


        {/* SUMMARY */}

        <section className="stats-grid">


          <div className="stat-card">

            <div className="stat-icon purple">
              <BrainCircuit size={21} />
            </div>

            <div>

              <span className="stat-label">
                SELECTED MODEL
              </span>

              <strong>
                Gradient Boosting
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              <BarChart3 size={21} />
            </div>

            <div>

              <span className="stat-label">
                ACCURACY
              </span>

              <strong>
                79.91%
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <ShieldCheck size={21} />
            </div>

            <div>

              <span className="stat-label">
                ROC-AUC
              </span>

              <strong>
                85.29%
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <Users size={21} />
            </div>

            <div>

              <span className="stat-label">
                TEST SAMPLES
              </span>

              <strong>
                1,409
              </strong>

            </div>

          </div>

        </section>


        {/* MODEL TABLE */}

        <div className="card model-performance-card">

          <div className="card-header">

            <div>

              <div className="card-title">

                <ShieldCheck size={20} />

                Model Comparison

              </div>

              <p>
                Evaluation results from the trained
                machine learning models.
              </p>

            </div>

          </div>


          <div className="model-table-wrapper">

            <table className="model-table">

              <thead>

                <tr>

                  <th>Model</th>
                  <th>Accuracy</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>F1 Score</th>
                  <th>ROC-AUC</th>

                </tr>

              </thead>


              <tbody>

                {models.map((model) => (

                  <tr key={model.name}>

                    <td>

                      <strong>
                        {model.name}
                      </strong>

                      {model.selected && (

                        <span className="selected-model">
                          Selected
                        </span>

                      )}

                    </td>

                    <td>
                      {model.accuracy}
                    </td>

                    <td>
                      {model.precision}
                    </td>

                    <td>
                      {model.recall}
                    </td>

                    <td>
                      {model.f1}
                    </td>

                    <td>
                      <strong>
                        {model.rocAuc}
                      </strong>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* MODEL INFORMATION */}

        <div className="card model-info-card">

          <div className="card-title">

            <Cpu size={20} />

            Selected Model Information

          </div>

          <p>
            Gradient Boosting was selected as the
            production model for the churn prediction
            API. The model was evaluated using a
            stratified test set of 1,409 customers.
          </p>


          <div className="model-info-grid">

            <div>

              <span>
                Algorithm
              </span>

              <strong>
                Gradient Boosting
              </strong>

            </div>


            <div>

              <span>
                Accuracy
              </span>

              <strong>
                79.91%
              </strong>

            </div>


            <div>

              <span>
                Precision
              </span>

              <strong>
                64.72%
              </strong>

            </div>


            <div>

              <span>
                Recall
              </span>

              <strong>
                53.48%
              </strong>

            </div>


            <div>

              <span>
                ROC-AUC
              </span>

              <strong>
                85.29%
              </strong>

            </div>

          </div>

        </div>

      </div>
    );
  };


  /* ==========================================================
     API STATUS PAGE
  ========================================================== */

  const renderApiStatusPage = () => {

    const isOnline =
      apiStatus &&
      apiStatus.api === "online";

    return (

      <div className="model-performance-page">


        {/* STATUS SUMMARY */}

        <section className="stats-grid">


          <div className="stat-card">

            <div
              className={`stat-icon ${
                isOnline ? "green" : "orange"
              }`}
            >

              <Server size={21} />

            </div>

            <div>

              <span className="stat-label">
                API STATUS
              </span>

              <strong>
                {apiStatusLoading
                  ? "Checking..."
                  : isOnline
                  ? "Online"
                  : "Offline"}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div
              className={`stat-icon ${
                apiStatus?.model_loaded
                  ? "green"
                  : "orange"
              }`}
            >

              <BrainCircuit size={21} />

            </div>

            <div>

              <span className="stat-label">
                ML MODEL
              </span>

              <strong>
                {apiStatus?.model_loaded
                  ? "Loaded"
                  : apiStatus
                  ? "Not Loaded"
                  : "Checking..."}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div
              className={`stat-icon ${
                apiStatus?.database_connected
                  ? "green"
                  : "orange"
              }`}
            >

              <Database size={21} />

            </div>

            <div>

              <span className="stat-label">
                DATABASE
              </span>

              <strong>
                {apiStatus?.database_connected
                  ? "Connected"
                  : apiStatus
                  ? "Disconnected"
                  : "Checking..."}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              <Activity size={21} />
            </div>

            <div>

              <span className="stat-label">
                SERVER
              </span>

              <strong>
                Port 8001
              </strong>

            </div>

          </div>

        </section>


        {/* STATUS CARD */}

        <div className="card model-info-card">

          <div className="card-title">

            <Activity size={20} />

            System Health

          </div>


          {apiStatusLoading && (

            <div className="empty-result">

              <Loader2
                size={30}
                className="spin"
              />

              <h3>
                Checking system status...
              </h3>

            </div>

          )}


          {apiStatusError && !apiStatusLoading && (

            <div className="error-box">

              <AlertTriangle size={22} />

              <div>

                <strong>
                  API connection failed
                </strong>

                <p>
                  {apiStatusError}
                </p>

              </div>

            </div>

          )}


          {apiStatus && !apiStatusLoading && !apiStatusError && (

            <>

              <p>
                The following components are currently
                connected to the Customer Churn Prediction
                backend.
              </p>


              <div className="model-info-grid">

                <div>

                  <span>
                    FastAPI
                  </span>

                  <strong>
                    {apiStatus.api === "online"
                      ? "Online"
                      : "Offline"}
                  </strong>

                </div>


                <div>

                  <span>
                    ML Model
                  </span>

                  <strong>
                    {apiStatus.model_loaded
                      ? "Loaded"
                      : "Unavailable"}
                  </strong>

                </div>


                <div>

                  <span>
                    SQLite
                  </span>

                  <strong>
                    {apiStatus.database_connected
                      ? "Connected"
                      : "Unavailable"}
                  </strong>

                </div>


                <div>

                  <span>
                    API Port
                  </span>

                  <strong>
                    8001
                  </strong>

                </div>


                <div>

                  <span>
                    Status
                  </span>

                  <strong>
                    Healthy
                  </strong>

                </div>

              </div>

            </>

          )}


          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >

            <button
              className="secondary-btn"
              onClick={fetchApiStatus}
              disabled={apiStatusLoading}
            >

              {apiStatusLoading ? (
                <>
                  <Loader2
                    size={16}
                    className="spin"
                  />

                  Checking...
                </>
              ) : (
                <>
                  <RefreshCw size={16} />

                  Refresh Status
                </>
              )}

            </button>

          </div>

        </div>

      </div>
    );
  };


  /* ==========================================================
     PAGE TITLE
  ========================================================== */

  const getPageTitle = () => {

    if (activePage === "predict") {
      return "Customer Churn Prediction";
    }

    if (activePage === "history") {
      return "Prediction History";
    }

    if (activePage === "analytics") {
      return "Churn Analytics";
    }

    if (activePage === "model") {
      return "Model Performance";
    }

    return "API Status";
  };


  const getBreadcrumb = () => {

    if (activePage === "predict") {
      return "PREDICTION";
    }

    if (activePage === "history") {
      return "HISTORY";
    }

    if (activePage === "analytics") {
      return "ANALYTICS";
    }

    if (activePage === "model") {
      return "MODEL PERFORMANCE";
    }

    return "API STATUS";
  };


  /* ==========================================================
     MAIN RETURN
  ========================================================== */

  return (

    <div className="app-container">


      {/* ======================================================
         SIDEBAR
      ====================================================== */}

      <aside className="sidebar">


        {/* BRAND */}

        <div className="brand">

          <div className="brand-icon">

            <BrainCircuit size={25} />

          </div>


          <div>

            <h2>
              ChurnAI
            </h2>

            <span>
              Prediction Platform
            </span>

          </div>

        </div>


        {/* WORKSPACE */}

        <div className="nav-section">

          <p className="nav-label">
            WORKSPACE
          </p>


          {/* PREDICT */}

          <button
            className={`nav-item ${
              activePage === "predict"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("predict")
            }
          >

            <LayoutDashboard size={19} />

            <span>
              Predict Churn
            </span>

          </button>


          {/* HISTORY */}

          <button
            className={`nav-item ${
              activePage === "history"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("history")
            }
          >

            <History size={19} />

            <span>
              Prediction History
            </span>

          </button>


          {/* ANALYTICS */}

          <button
            className={`nav-item ${
              activePage === "analytics"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("analytics")
            }
          >

            <BarChart3 size={19} />

            <span>
              Analytics
            </span>

          </button>

        </div>


        {/* SYSTEM */}

        <div className="nav-section">

          <p className="nav-label">
            SYSTEM
          </p>


          {/* MODEL PERFORMANCE */}

          <button
            className={`nav-item ${
              activePage === "model"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("model")
            }
          >

            <ShieldCheck size={19} />

            <span>
              Model Performance
            </span>

          </button>


          {/* API STATUS */}

          <button
            className={`nav-item ${
              activePage === "status"
                ? "active"
                : ""
            }`}
            onClick={() => {

              setActivePage("status");

              fetchApiStatus();

            }}
          >

            <Activity size={19} />

            <span>
              API Status
            </span>

          </button>

        </div>


        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <div className="system-card">

            <div className="online-dot"></div>

            <div>

              <strong>
                AI Model Online
              </strong>

              <span>
                Gradient Boosting
              </span>

            </div>

          </div>


          <div className="version">
            ChurnAI v1.0
          </div>

        </div>

      </aside>


      {/* ======================================================
         MAIN
      ====================================================== */}

      <main className="main-content">


        {/* TOP BAR */}

        <header className="topbar">

          <div>

            <p className="breadcrumb">

              WORKSPACE /{" "}

              {getBreadcrumb()}

            </p>


            <h1>
              {getPageTitle()}
            </h1>

          </div>


          <div className="top-status">

            <span className="status-dot"></span>

            API Connected

          </div>

        </header>


        {/* ====================================================
           PAGE CONTENT
        ==================================================== */}

        {activePage === "predict"

          ? renderPredictionPage()

          : activePage === "history"

          ? renderHistoryPage()

          : activePage === "analytics"

          ? renderAnalyticsPage()

          : activePage === "model"

          ? renderModelPerformancePage()

          : renderApiStatusPage()}

      </main>

    </div>
  );
}


export default App;