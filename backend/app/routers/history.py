
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Resume, Analysis

router = APIRouter(
    prefix="/history",
    tags=["Resume History"]
)


# Get dashboard statistics
@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):

    total_resumes = db.query(Resume).count()
    total_analyses = db.query(Analysis).count()

    analyses = db.query(Analysis).all()

    average_match_score = (
        sum(analysis.match_score for analysis in analyses) / total_analyses
        if total_analyses > 0
        else 0
    )

    latest_resume = (
        db.query(Resume)
        .order_by(Resume.created_at.desc())
        .first()
    )

    return {
        "total_resumes": total_resumes,
        "total_analyses": total_analyses,
        "average_match_score": round(average_match_score, 2),
        "latest_resume": {
            "id": latest_resume.id,
            "filename": latest_resume.filename,
            "created_at": latest_resume.created_at
        } if latest_resume else None
    }


# Get all uploaded resumes
@router.get("/resumes")
def get_all_resumes(db: Session = Depends(get_db)):

    resumes = (
        db.query(Resume)
        .order_by(Resume.created_at.desc())
        .all()
    )

    return {
        "total_resumes": len(resumes),
        "resumes": [
            {
                "id": resume.id,
                "filename": resume.filename,
                "total_skills": resume.total_skills,
                "created_at": resume.created_at
            }
            for resume in resumes
        ]
    }


# Get individual resume details and analysis history
@router.get("/resumes/{resume_id}")
def get_resume_history(
    resume_id: int,
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    return {
        "resume_id": resume.id,
        "filename": resume.filename,
        "total_skills": resume.total_skills,
        "detected_skills": resume.detected_skills,
        "created_at": resume.created_at,

        "analyses": [
            {
                "analysis_id": analysis.id,
                "match_score": analysis.match_score,
                "text_similarity": analysis.text_similarity,
                "skill_coverage": analysis.skill_coverage,
                "matched_skills": analysis.matched_skills,
                "missing_skills": analysis.missing_skills,
                "required_skills": analysis.required_skills,
                "created_at": analysis.created_at
            }
            for analysis in resume.analyses
        ]
    }


# Get match score analytics
@router.get("/analytics")
def get_match_analytics(db: Session = Depends(get_db)):

    analyses = (
        db.query(Analysis)
        .join(Resume, Analysis.resume_id == Resume.id)
        .order_by(Analysis.created_at.asc())
        .all()
    )

    scores = [
        {
            "analysis_id": analysis.id,
            "resume_id": analysis.resume_id,
            "filename": analysis.resume.filename,
            "match_score": round(analysis.match_score, 2),
            "text_similarity": round(analysis.text_similarity, 2),
            "skill_coverage": round(analysis.skill_coverage, 2),
            "created_at": analysis.created_at
        }
        for analysis in analyses
    ]

    total_analyses = len(scores)

    average_score = (
        sum(item["match_score"] for item in scores) / total_analyses
        if total_analyses > 0
        else 0
    )

    return {
        "total_analyses": total_analyses,
        "average_match_score": round(average_score, 2),
        "scores": scores
    }
