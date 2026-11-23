
from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    DateTime,
    ForeignKey,
    JSON
)
from sqlalchemy.orm import relationship

from app.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255), nullable=False)

    extracted_text = Column(Text, nullable=False)

    detected_skills = Column(JSON, nullable=False)

    total_skills = Column(Integer, default=0)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    analyses = relationship(
        "Analysis",
        back_populates="resume",
        cascade="all, delete-orphan"
    )


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False
    )

    job_description = Column(Text, nullable=False)

    match_score = Column(Float, nullable=False)

    text_similarity = Column(Float, nullable=False)

    skill_coverage = Column(Float, nullable=False)

    matched_skills = Column(JSON, nullable=False)

    missing_skills = Column(JSON, nullable=False)

    resume_skills = Column(JSON, nullable=False)

    required_skills = Column(JSON, nullable=False)

    total_required_skills = Column(Integer, default=0)

    total_matched_skills = Column(Integer, default=0)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    resume = relationship(
        "Resume",
        back_populates="analyses"
    )
