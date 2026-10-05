import { query } from "../config/db.js";
import { matchSkills } from "./pythonService.js";

export async function getStudentSkills(studentId) {
  const rows = await query(
    `SELECT skills.name
     FROM student_skills
     JOIN skills ON skills.id = student_skills.skill_id
     WHERE student_skills.student_id = :studentId`,
    { studentId }
  );
  return rows.map((row) => row.name);
}

export async function getJobSkills(jobId) {
  const rows = await query(
    `SELECT skills.name
     FROM job_skills
     JOIN skills ON skills.id = job_skills.skill_id
     WHERE job_skills.job_id = :jobId`,
    { jobId }
  );
  return rows.map((row) => row.name);
}

export async function checkEligibility(jobId, studentId) {
  const [student] = await query("SELECT * FROM students WHERE id = :studentId", { studentId });
  const [job] = await query("SELECT * FROM jobs WHERE id = :jobId", { jobId });

  if (!student || !job) {
    return { eligible: false, score: 0, checks: [], reasons: ["Student or job not found"] };
  }

  const allowedBranches = String(job.eligible_branches || "")
    .split(",")
    .map((branch) => branch.trim().toLowerCase())
    .filter(Boolean);

  const checks = [
    {
      label: "CGPA",
      passed: Number(student.cgpa) >= Number(job.minimum_cgpa),
      message: `Required CGPA: ${job.minimum_cgpa}. Student CGPA: ${student.cgpa}.`
    },
    {
      label: "Branch",
      passed: allowedBranches.includes(String(student.branch || "").toLowerCase()),
      message: `Allowed branches: ${job.eligible_branches}. Student branch: ${student.branch}.`
    },
    {
      label: "Backlogs",
      passed: Number(student.backlogs) <= Number(job.maximum_backlogs),
      message: `Maximum backlogs: ${job.maximum_backlogs}. Student backlogs: ${student.backlogs}.`
    },
    {
      label: "Graduation year",
      passed: Number(student.graduation_year) === Number(job.graduation_year),
      message: `Required graduation year: ${job.graduation_year}. Student year: ${student.graduation_year}.`
    },
    {
      label: "Experience",
      passed: Number(student.experience_years) >= Number(job.experience_required),
      message: `Required experience: ${job.experience_required}. Student experience: ${student.experience_years}.`
    }
  ];

  const studentSkills = await getStudentSkills(studentId);
  const jobSkills = await getJobSkills(jobId);
  const skillMatch = await matchSkills(studentSkills, jobSkills);
  checks.push({
    label: "Skills",
    passed: skillMatch.missing_skills.length === 0,
    message: skillMatch.missing_skills.length ? `Missing skills: ${skillMatch.missing_skills.join(", ")}.` : "All required skills matched."
  });

  const passed = checks.filter((check) => check.passed).length;
  const score = Number(((passed / checks.length) * 100).toFixed(2));
  const reasons = checks.filter((check) => !check.passed).map((check) => check.message);

  return {
    eligible: reasons.length === 0,
    score,
    checks,
    reasons,
    matched_skills: skillMatch.matched_skills,
    missing_skills: skillMatch.missing_skills,
    student,
    job
  };
}
