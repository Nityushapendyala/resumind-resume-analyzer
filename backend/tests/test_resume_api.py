
from app.routers import resume as resume_module


SAMPLE_RESUME_TEXT = """
Python developer with experience in FastAPI,
PostgreSQL, SQL, REST APIs and Git.
"""


SAMPLE_SKILLS = {
    "Programming": ["Python"],
    "Backend": ["FastAPI"],
    "Databases": ["PostgreSQL"]
}


SAMPLE_ANALYSIS = {
    "match_score": 85.5,
    "text_similarity": 80.0,
    "skill_coverage": 91.0,
    "matched_skills": ["fastapi", "python"],
    "missing_skills": ["docker"],
    "resume_skills": ["fastapi", "python"],
    "required_skills": ["docker", "fastapi", "python"],
    "total_required_skills": 3,
    "total_matched_skills": 2
}


def mock_resume_processing(monkeypatch):
    monkeypatch.setattr(
        resume_module,
        "extract_resume_text",
        lambda file_bytes, filename: SAMPLE_RESUME_TEXT
    )

    monkeypatch.setattr(
        resume_module,
        "extract_skills",
        lambda text: SAMPLE_SKILLS
    )

    monkeypatch.setattr(
        resume_module,
        "count_skills",
        lambda skills: 3
    )


def test_resume_upload_success(client, monkeypatch):
    mock_resume_processing(monkeypatch)

    response = client.post(
        "/resume/upload",
        files={
            "file": (
                "resume.pdf",
                b"sample pdf content",
                "application/pdf"
            )
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "success"
    assert data["resume_id"] == 1
    assert data["filename"] == "resume.pdf"
    assert data["skills_analysis"]["total_skills"] == 3


def test_resume_upload_invalid_file(client):
    response = client.post(
        "/resume/upload",
        files={
            "file": (
                "resume.txt",
                b"sample content",
                "text/plain"
            )
        }
    )

    assert response.status_code == 400
    assert response.json()["detail"] == (
        "Only PDF and DOCX files are allowed."
    )


def test_job_matching_and_history(client, monkeypatch):
    mock_resume_processing(monkeypatch)

    monkeypatch.setattr(
        resume_module,
        "match_resume_with_job",
        lambda resume_text, job_description: SAMPLE_ANALYSIS
    )

    response = client.post(
        "/resume/match",
        data={
            "job_description": (
                "Python developer with FastAPI, "
                "PostgreSQL and Docker."
            )
        },
        files={
            "file": (
                "resume.pdf",
                b"sample pdf content",
                "application/pdf"
            )
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "success"
    assert data["resume_id"] == 1
    assert data["analysis_id"] == 1
    assert data["analysis"]["match_score"] == 85.5

    # Verify saved resume history
    history_response = client.get(
        "/history/resumes/1"
    )

    assert history_response.status_code == 200

    history = history_response.json()

    assert history["resume_id"] == 1
    assert len(history["analyses"]) == 1
    assert history["analyses"][0]["match_score"] == 85.5


def test_resume_history_not_found(client):
    response = client.get("/history/resumes/999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Resume not found."
