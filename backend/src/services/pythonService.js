import { env } from "../config/env.js";

export async function analyzeResume(filePath) {
  try {
    const response = await fetch(`${env.pythonServiceUrl}/analyze-resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_path: filePath })
    });

    if (!response.ok) {
      throw new Error("Python service returned an error");
    }

    return response.json();
  } catch (_error) {
    return {
      extracted_text: "",
      skills: [],
      warning: "Resume analysis service unavailable"
    };
  }
}

export async function matchSkills(studentSkills, jobSkills) {
  try {
    const response = await fetch(`${env.pythonServiceUrl}/match-skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_skills: studentSkills, job_skills: jobSkills })
    });

    if (!response.ok) {
      throw new Error("Python service returned an error");
    }

    return response.json();
  } catch (_error) {
    const matched = jobSkills.filter((skill) => studentSkills.map((item) => item.toLowerCase()).includes(skill.toLowerCase()));
    const missing = jobSkills.filter((skill) => !matched.includes(skill));
    return {
      matched_skills: matched,
      missing_skills: missing,
      match_percentage: jobSkills.length ? Number(((matched.length / jobSkills.length) * 100).toFixed(2)) : 100,
      warning: "Python matching service unavailable; used backend fallback"
    };
  }
}
