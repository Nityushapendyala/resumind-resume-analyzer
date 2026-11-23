
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.services.skill_extractor import extract_skills


def calculate_text_similarity(resume_text: str, job_description: str) -> float:
    """
    Calculate textual similarity using TF-IDF
    and cosine similarity.
    """

    documents = [resume_text, job_description]

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        sublinear_tf=True
    )

    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0]

    return round(float(similarity) * 100, 2)


def get_all_skills(skills_data: dict) -> set:
    """Convert categorized skills into a single set."""

    return {
        skill.lower()
        for skill_list in skills_data.values()
        for skill in skill_list
    }


def match_resume_with_job(
    resume_text: str,
    job_description: str
) -> dict:
    """
    Compare resume against a job description
    using textual similarity and skill coverage.
    """

    if not resume_text.strip():
        raise ValueError("Resume text cannot be empty.")

    if not job_description.strip():
        raise ValueError("Job description cannot be empty.")

    # Extract skills from both documents
    resume_skills_data = extract_skills(resume_text)
    job_skills_data = extract_skills(job_description)

    resume_skills = get_all_skills(resume_skills_data)
    required_skills = get_all_skills(job_skills_data)

    # Identify matched and missing skills
    matched_skills = sorted(resume_skills & required_skills)
    missing_skills = sorted(required_skills - resume_skills)

    # Calculate skill coverage
    if required_skills:
        skill_coverage = (
            len(matched_skills) / len(required_skills)
        ) * 100
    else:
        skill_coverage = 0.0

    # Calculate textual similarity
    text_similarity = calculate_text_similarity(
        resume_text,
        job_description
    )

    # Calculate overall match score
    match_score = (
        0.5 * text_similarity
        + 0.5 * skill_coverage
    )

    return {
        "match_score": round(match_score, 2),
        "text_similarity": text_similarity,
        "skill_coverage": round(skill_coverage, 2),

        "matched_skills": matched_skills,
        "missing_skills": missing_skills,

        "resume_skills": sorted(resume_skills),
        "required_skills": sorted(required_skills),

        "total_required_skills": len(required_skills),
        "total_matched_skills": len(matched_skills)
    }
