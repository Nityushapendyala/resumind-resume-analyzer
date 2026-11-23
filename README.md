# Resumind – AI Resume Analyzer & Job Matcher

An intelligent resume analysis platform that helps job seekers evaluate their resumes against job descriptions, identify skill gaps, and improve their job readiness.

## 🚀 Live Demo

- **Frontend:** https://resumind-resume-analyzer-roan.vercel.app/
- **Backend API:** https://resumind-resume-analyzer.onrender.com/
- **API Documentation:** https://resumind-resume-analyzer.onrender.com/docs

## ✨ Features

- Resume upload and parsing (PDF and DOCX)
- Job description analysis
- Resume-to-job matching score
- Matched skills identification
- Missing skills identification
- Skill gap recommendations
- Resume improvement suggestions
- Dashboard with analytics
- Resume analysis history
- PDF analysis report download

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Python, FastAPI |
| Database | PostgreSQL, Neon |
| ORM | SQLAlchemy |
| NLP & Matching | spaCy, scikit-learn |
| Document Processing | PyMuPDF, python-docx |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Version Control | Git, GitHub |

## 🏗️ Architecture

```text
User
  |
  v
React + Vite Frontend
  |
  v
FastAPI Backend
  |
  v
Resume Parsing & Matching
  |
  v
PostgreSQL Database (Neon)
  |
  v
Analysis Results
  |
  v
Dashboard & Reports
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Nityushapendyala/resumind-resume-analyzer.git
cd resumind-resume-analyzer
```

### 2. Backend setup

```bash
python -m venv .venv
```

Activate the environment:

Windows:
```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Create a `.env` file in the project root:

```env
DATABASE_URL=your_postgresql_connection_string
```

Start the backend:

```bash
uvicorn app.main:app --reload --app-dir backend
```

Backend: http://127.0.0.1:8000

API documentation: http://127.0.0.1:8000/docs

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

Frontend: http://localhost:5173

## 🧪 Testing

Run backend tests:

```bash
python -m pytest backend/tests -v
```

## 🌐 Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- PostgreSQL hosted on Neon

## 🎯 Project Objective

Resumind aims to simplify the job application process by helping candidates understand how well their resumes align with job requirements and identify areas for improvement.

## 👩‍💻 Author

**Nityusha Pendyala**

GitHub: https://github.com/Nityushapendyala

---

⭐ If
