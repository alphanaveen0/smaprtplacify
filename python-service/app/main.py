from fastapi import FastAPI
from pydantic import BaseModel

from app.resume_parser.parser import parse_resume
from app.skill_matching.matcher import extract_skills, match_skills

app = FastAPI(title="SmartPlacify Python Matching Service")


class ResumeRequest(BaseModel):
    file_path: str


class SkillMatchRequest(BaseModel):
    student_skills: list[str]
    job_skills: list[str]


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "smartplacify-python-service"}


@app.post("/analyze-resume")
def analyze_resume(payload: ResumeRequest) -> dict:
    text = parse_resume(payload.file_path)
    skills = extract_skills(text)
    return {
        "extracted_text": text,
        "skills": skills,
    }


@app.post("/match-skills")
def match(payload: SkillMatchRequest) -> dict:
    return match_skills(payload.student_skills, payload.job_skills)
