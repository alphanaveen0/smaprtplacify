import { query } from "../config/db.js";

export async function tpoDashboard(_req, res) {
  const [stats] = await query(`
    SELECT
      (SELECT COUNT(*) FROM students) AS total_students,
      (SELECT COUNT(*) FROM students WHERE cgpa >= 7 AND backlogs <= 1) AS eligible_students,
      (SELECT COUNT(*) FROM companies) AS companies,
      (SELECT COUNT(*) FROM jobs) AS jobs,
      (SELECT COUNT(*) FROM applications) AS applications,
      (SELECT COUNT(*) FROM interviews) AS interviews,
      (SELECT COUNT(*) FROM applications WHERE status = 'SELECTED') AS selected_students
  `);
  const monthly = await query(`
    SELECT DATE_FORMAT(applied_at, '%b') AS month, COUNT(*) AS applications
    FROM applications
    GROUP BY DATE_FORMAT(applied_at, '%Y-%m'), DATE_FORMAT(applied_at, '%b')
    ORDER BY MIN(applied_at)
  `);
  const skillDemand = await query(`
    SELECT skills.name, COUNT(*) AS demand
    FROM job_skills
    JOIN skills ON skills.id = job_skills.skill_id
    GROUP BY skills.id
    ORDER BY demand DESC
    LIMIT 8
  `);
  const placementPercentage = stats.total_students ? Number(((stats.selected_students / stats.total_students) * 100).toFixed(2)) : 0;

  res.json({ ...stats, placement_percentage: placementPercentage, monthly, skill_demand: skillDemand });
}

export async function studentDashboard(req, res) {
  const [student] = await query("SELECT id FROM students WHERE user_id = :userId OR email = :email", {
    userId: req.user.id,
    email: req.user.email
  });

  if (!student) {
    res.json({ eligible_jobs: 0, applied_jobs: 0, shortlisted_jobs: 0, interviews: 0, placement_status: "NOT_PLACED", notifications: 0 });
    return;
  }

  const [stats] = await query(
    `SELECT
      (SELECT COUNT(*) FROM jobs WHERE status = 'ACTIVE') AS eligible_jobs,
      (SELECT COUNT(*) FROM applications WHERE student_id = :studentId) AS applied_jobs,
      (SELECT COUNT(*) FROM applications WHERE student_id = :studentId AND status = 'SHORTLISTED') AS shortlisted_jobs,
      (SELECT COUNT(*) FROM interviews WHERE student_id = :studentId AND status = 'SCHEDULED') AS interviews,
      (SELECT placement_status FROM students WHERE id = :studentId) AS placement_status,
      (SELECT COUNT(*) FROM notifications WHERE user_id = :userId AND is_read = false) AS notifications`,
    { studentId: student.id, userId: req.user.id }
  );

  res.json(stats);
}

export async function companyDashboard(req, res) {
  const [company] = await query("SELECT id FROM companies WHERE user_id = :userId OR email = :email", {
    userId: req.user.id,
    email: req.user.email
  });

  if (!company) {
    res.json({ total_jobs: 0, active_jobs: 0, applications: 0, shortlisted: 0, interviews: 0, selected: 0 });
    return;
  }

  const [stats] = await query(
    `SELECT
      (SELECT COUNT(*) FROM jobs WHERE company_id = :companyId) AS total_jobs,
      (SELECT COUNT(*) FROM jobs WHERE company_id = :companyId AND status = 'ACTIVE') AS active_jobs,
      (SELECT COUNT(*) FROM applications WHERE company_id = :companyId) AS applications,
      (SELECT COUNT(*) FROM applications WHERE company_id = :companyId AND status = 'SHORTLISTED') AS shortlisted,
      (SELECT COUNT(*) FROM interviews WHERE company_id = :companyId) AS interviews,
      (SELECT COUNT(*) FROM applications WHERE company_id = :companyId AND status = 'SELECTED') AS selected`,
    { companyId: company.id }
  );

  res.json(stats);
}
