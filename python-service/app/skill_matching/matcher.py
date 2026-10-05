KNOWN_SKILLS = {
    "react",
    "react native",
    "node.js",
    "node",
    "express",
    "mysql",
    "sql",
    "python",
    "java",
    "aws",
    "docker",
    "mongodb",
    "communication",
    "data structures",
    "javascript",
    "typescript",
}


def normalize_skill(skill: str) -> str:
    return skill.strip().lower()


def extract_skills(text: str) -> list[str]:
    lowered = text.lower()
    found = sorted({skill for skill in KNOWN_SKILLS if skill in lowered})
    return [skill.title() if skill != "node.js" else "Node.js" for skill in found]


def match_skills(student_skills: list[str], job_skills: list[str]) -> dict:
    normalized_student = {normalize_skill(skill) for skill in student_skills}
    normalized_jobs = {normalize_skill(skill) for skill in job_skills}
    matched = sorted(normalized_student.intersection(normalized_jobs))
    missing = sorted(normalized_jobs.difference(normalized_student))
    percentage = round((len(matched) / len(normalized_jobs)) * 100, 2) if normalized_jobs else 100.0

    return {
        "matched_skills": matched,
        "missing_skills": missing,
        "match_percentage": percentage,
    }
