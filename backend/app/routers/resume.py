
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Resume, Analysis

from app.services.resume_parser import extract_resume_text

from app.services.skill_extractor import (
    extract_skills,
    count_skills
)

from app.services.job_matcher import match_resume_with_job


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


def process_resume(file_bytes: bytes, filename: str) -> str:
    """Extract and validate resume text."""

    extracted_text = extract_resume_text(
        file_bytes,
        filename
    )

    if not extracted_text:
        raise HTTPException(
            status_code=422,
            detail="No readable text found in the resume."
        )

    return extracted_text


def validate_file(filename: str, file_bytes: bytes):
    """Validate uploaded resume files."""

    extension = filename.lower().split(".")[-1]

    if extension not in ["pdf", "docx"]:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    if len(file_bytes) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="File size must not exceed 5 MB."
        )


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    filename = file.filename or ""
    file_bytes = await file.read()

    try:
        validate_file(filename, file_bytes)

        extracted_text = process_resume(
            file_bytes,
            filename
        )

        detected_skills = extract_skills(extracted_text)
        total_skills = count_skills(detected_skills)

        # Create database record
        new_resume = Resume(
            filename=filename,
            extracted_text=extracted_text,
            detected_skills=detected_skills,
            total_skills=total_skills
        )

        db.add(new_resume)
        db.commit()
        db.refresh(new_resume)

        return {
            "resume_id": new_resume.id,
            "filename": filename,
            "status": "success",
            "message": "Resume analyzed and saved successfully.",
            "extracted_text": extracted_text,
            "skills_analysis": {
                "detected_skills": detected_skills,
                "total_skills": total_skills
            }
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=422,
            detail="Unable to process and save this resume."
        )


@router.post("/match")
async def match_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    db: Session = Depends(get_db)
):

    filename = file.filename or ""
    file_bytes = await file.read()

    try:
        validate_file(filename, file_bytes)

        if not job_description.strip():
            raise HTTPException(
                status_code=400,
                detail="Job description cannot be empty."
            )

        extracted_text = process_resume(
            file_bytes,
            filename
        )

        # Extract resume skills
        detected_skills = extract_skills(extracted_text)
        total_skills = count_skills(detected_skills)

        # Save resume
        new_resume = Resume(
            filename=filename,
            extracted_text=extracted_text,
            detected_skills=detected_skills,
            total_skills=total_skills
        )

        db.add(new_resume)
        db.flush()

        # Calculate job match
        result = match_resume_with_job(
            extracted_text,
            job_description
        )

        # Save matching analysis
        new_analysis = Analysis(
            resume_id=new_resume.id,
            job_description=job_description,
            match_score=result["match_score"],
            text_similarity=result["text_similarity"],
            skill_coverage=result["skill_coverage"],
            matched_skills=result["matched_skills"],
            missing_skills=result["missing_skills"],
            resume_skills=result["resume_skills"],
            required_skills=result["required_skills"],
            total_required_skills=result["total_required_skills"],
            total_matched_skills=result["total_matched_skills"]
        )

        db.add(new_analysis)
        db.commit()

        db.refresh(new_resume)
        db.refresh(new_analysis)

        return {
            "status": "success",
            "resume_id": new_resume.id,
            "analysis_id": new_analysis.id,
            "filename": filename,
            "message": "Job matching completed and saved successfully.",
            "analysis": result
        }

    except HTTPException:
        db.rollback()
        raise

    except ValueError as error:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=422,
            detail="Unable to complete and save job matching."
        )
