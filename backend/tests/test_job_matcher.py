
import pytest

from app.services.job_matcher import (
    calculate_text_similarity,
    match_resume_with_job
)


def test_text_similarity():
    resume = "Python developer with FastAPI experience."

    job = "Looking for a Python developer with FastAPI skills."

    score = calculate_text_similarity(resume, job)

    assert 0 <= score <= 100


def test_identify_matched_skills():
    resume = """
    Python developer with React, FastAPI,
    PostgreSQL and Git experience.
    """

    job = """
    Requirements: Python, React, FastAPI,
    Docker and AWS.
    """

    result = match_resume_with_job(resume, job)

    assert "python" in result["matched_skills"]
    assert "react" in result["matched_skills"]
    assert "fastapi" in result["matched_skills"]


def test_identify_missing_skills():
    resume = "Python and React developer."

    job = "Requirements: Python, React, Docker and AWS."

    result = match_resume_with_job(resume, job)

    assert "docker" in result["missing_skills"]
    assert "aws" in result["missing_skills"]


def test_skill_coverage():
    resume = "Python and React developer."

    job = "Python, React, Docker and AWS required."

    result = match_resume_with_job(resume, job)

    assert result["skill_coverage"] == 50.0


def test_empty_resume():
    with pytest.raises(ValueError):
        match_resume_with_job(
            "",
            "Python developer required."
        )


def test_empty_job_description():
    with pytest.raises(ValueError):
        match_resume_with_job(
            "Python developer",
            ""
        )


def test_match_score_formula():
    resume = "Python developer with React experience."

    job = "Python developer with React and Docker experience."

    result = match_resume_with_job(resume, job)

    expected = (
        0.5 * result["text_similarity"]
        + 0.5 * result["skill_coverage"]
    )

    assert result["match_score"] == round(expected, 2)
