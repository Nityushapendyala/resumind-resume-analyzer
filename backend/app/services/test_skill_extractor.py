
from skill_extractor import extract_skills, count_skills


sample_resume = """
Computer Science Engineering Student.

Technical Skills:
Python, Java, C++, React, HTML, CSS,
FastAPI, MySQL, PostgreSQL, Git, GitHub,
Machine Learning, Pandas, NumPy.

Projects:
Developed a web application using React
and FastAPI with PostgreSQL database.
"""


skills = extract_skills(sample_resume)

print("DETECTED SKILLS")
print("--------------------")

for category, skill_list in skills.items():
    print(f"\n{category}:")
    for skill in skill_list:
        print(f" - {skill}")

print("\nTotal skills:", count_skills(skills))
