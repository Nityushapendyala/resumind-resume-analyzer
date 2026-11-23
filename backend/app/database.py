
import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# Locate the project root directory
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Load environment variables
ENV_FILE = PROJECT_ROOT / ".env"
load_dotenv(ENV_FILE)

# Get database URL
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        f"DATABASE_URL is missing. Check your .env file at {ENV_FILE}"
    )

# Create database engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Create database sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for database models
Base = declarative_base()


# FastAPI database dependency
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
