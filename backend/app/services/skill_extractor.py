
import re


# Technical skills database
SKILLS_DATABASE = {
    "Programming Languages": [
        "Python", "Java", "C", "C++", "JavaScript",
        "TypeScript", "PHP", "Ruby", "Go", "Rust"
    ],

    "Web Development": [
        "HTML", "CSS", "React", "Angular", "Vue",
        "Node.js", "Express.js", "FastAPI", "Django",
        "Flask", "REST API"
    ],

    "Databases": [
        "MySQL", "PostgreSQL", "MongoDB",
        "SQLite", "Redis", "Oracle"
    ],

    "Data Science and AI": [
        "Machine Learning", "Deep Learning",
        "Natural Language Processing", "NLP",
        "Pandas", "NumPy", "Scikit-learn",
        "TensorFlow", "PyTorch"
    ],

    "Tools and Technologies": [
        "Git", "GitHub", "Docker", "Kubernetes",
        "AWS", "Azure", "Linux", "Postman"
    ],

    "Core Computer Science": [
        "Data Structures", "Algorithms",
        "Object Oriented Programming",
        "Operating Systems", "DBMS",
        "Computer Networks"
    ]
}


# Extract skills from resume text
def extract_skills(text: str) -> dict:

    detected_skills = {}

    normalized_text = text.lower()

    for category, skills in SKILLS_DATABASE.items():

        found_skills = []

        for skill in skills:

            pattern = (
                r"(?<!\w)"
                + re.escape(skill.lower())
                + r"(?!\w)"
            )

            if re.search(pattern, normalized_text):
                found_skills.append(skill)

        if found_skills:
            detected_skills[category] = found_skills

    return detected_skills


# Get total number of detected skills
def count_skills(detected_skills: dict) -> int:

    return sum(
        len(skills)
        for skills in detected_skills.values()
    )

