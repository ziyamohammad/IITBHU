# 🧪 Drug Toxicity Prediction using Machine Learning

A machine learning project focused on predicting the toxicity of chemical compounds using molecular descriptor data. This project leverages a **Random Forest model** to identify potentially harmful compounds early in the drug development pipeline.

---

## 🚀 Overview

Drug development is expensive and time-consuming, and many candidates fail due to unexpected toxicity. This project aims to:

* Predict drug toxicity using machine learning
* Analyze molecular descriptors
* Identify important features contributing to toxicity
* Provide a simple API + frontend interface for predictions

---

## 🧠 Model Used

* **Algorithm:** Random Forest Classifier
* **Why Random Forest?**

  * Handles high-dimensional data well
  * Robust to overfitting
  * Provides feature importance for interpretability

---

## 📂 Project Structure

```
drug_toxicity_pred/
│── public/                         # Frontend files
│── venv/                           # Virtual environment (ignored)
│── .gitignore                      # Git ignore file
│── Drug_toxicity_prediction.ipynb  # Research & model training notebook
│── main.py                         # FastAPI app (backend server)
│── requirements.txt               # Dependencies
│── tox21.csv                      # Dataset
```

---

## 📊 Dataset

* **Dataset:** Tox21 Dataset
* **Source:** [https://www.kaggle.com/datasets/epicskills/tox21-dataset](https://www.kaggle.com/datasets/epicskills/tox21-dataset)

### Contains:

* ~12,000 chemical compounds
* Toxicity assay results
* Molecular descriptor features

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/drug_toxicity_pred.git
cd drug_toxicity_pred
```

### 2. Create virtual environment

```
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3. Install dependencies

```
pip install -r requirements.txt
```

---

## ▶️ Running the Project

Run the backend server:

```
python main.py
```

* Starts a **Uvicorn server**
* Mounts the frontend from the `public/` folder

Open in browser:

```
http://127.0.0.1:8000
```

---

## 📈 Features

* ✅ Data preprocessing of molecular descriptors
* ✅ Random Forest-based toxicity prediction
* ✅ Feature importance analysis
* ✅ Interactive frontend interface
* ✅ REST API using FastAPI

---

## 🔬 Research Notebook

The file:

```
Drug_toxicity_prediction.ipynb
```

Contains:

* Data cleaning & preprocessing
* Exploratory Data Analysis (EDA)
* Model training & evaluation
* Feature importance visualization

---

## 📌 Future Improvements

* Add deep learning models (e.g., Graph Neural Networks)
* Improve feature engineering
* Deploy on cloud (AWS / Render / HuggingFace Spaces)
* Add explainability (SHAP / LIME)
* Enhance UI/UX

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 💡 Author

**Kaif**
**Ziya**
**Yash**
**Satvat**
Computer Science Engineering Student
Interested in AI, ML & real-world problem solving
