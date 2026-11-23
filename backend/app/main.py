
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import Resume, Analysis
from app.routers.resume import router as resume_router
from app.routers.history import router as history_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="AI Resume Analyzer",
    description="An intelligent resume analysis and job matching platform",
    version="1.0.0",
    lifespan=lifespan
)


# Allow the React frontend to communicate with the FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Resume Analyzer!",
        "status": "Backend is running successfully"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "AI Resume Analyzer"
    }


app.include_router(resume_router)
app.include_router(history_router)
