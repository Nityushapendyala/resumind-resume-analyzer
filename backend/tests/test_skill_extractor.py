
from app.services.skill_extractor import (
    extract_skills,
    count_skills
)


def test_extract_python_skill():
    text = "I have experience working with Python."

    result = extract_skills(text)

    assert "Python" in result["Programming Languages"]


def test_extract_multiple_skills():
    text = """
    Python, Java, React, FastAPI,
    PostgreSQL, Git and Docker.
    """

    result = extract_skills(text)

    assert "Python" in result["Programming Languages"]
    assert "React" in result["Web Development"]
    assert "FastAPI" in result["Web Development"]
    assert "PostgreSQL" in result["Databases"]
    assert "Git" in result["Tools and Technologies"]


def test_count_skills():
    skills = {
        "Programming Languages": ["Python", "Java"],
        "Web Development": ["React", "FastAPI"]
    }

    assert count_skills(skills) == 4


def test_no_skills_found():
    result = extract_skills(
        "I enjoy reading books and playing football."
    )

    assert result == {}
