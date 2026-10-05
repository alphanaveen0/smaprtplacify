import { query, transaction } from "../config/db.js";
import { checkEligibility } from "../services/eligibilityService.js";
import { HttpError } from "../utils/http.js";

export async function listApplications(req, res) {
  const rows = await query(
    `SELECT applications.*, students.full_name AS student_name, jobs.title AS job_title, companies.name AS company_name
     FROM applications
     JOIN students ON students.id = applications.student_id
     JOIN jobs ON jobs.id = applications.job_id
     JOIN companies ON companies.id = applications.company_id
     WHERE (:status IS NULL OR applications.status = :status)
     ORDER BY applications.applied_at DESC`,
    { status: req.query.status || null }
  );
  res.json(rows);
}

export async function getApplication(req, res) {
  const rows = await query("SELECT * FROM applications WHERE id = :id", { id: req.params.id });
  if (!rows.length) {
    throw new HttpError(404, "Application not found");
  }
  res.json(rows[0]);
}

export async function createApplication(req, res) {
  const { student_id: studentId, job_id: jobId } = req.body;
  const eligibility = await checkEligibility(jobId, studentId);

  if (!eligibility.eligible) {
    throw new HttpError(400, `Not eligible: ${eligibility.reasons.join(" ")}`);
  }

  const [job] = await query("SELECT company_id FROM jobs WHERE id = :jobId", { jobId });

  if (!job) {
    throw new HttpError(404, "Job not found");
  }

  try {
    const result = await query(
      `INSERT INTO applications (student_id, job_id, company_id, eligibility_score, eligibility_snapshot)
       VALUES (:studentId, :jobId, :companyId, :score, :snapshot)`,
      {
        studentId,
        jobId,
        companyId: job.company_id,
        score: eligibility.score,
        snapshot: JSON.stringify(eligibility)
      }
    );
    const [student] = await query("SELECT user_id FROM students WHERE id = :studentId", { studentId });
    if (student?.user_id) {
      await query("INSERT INTO notifications (user_id, title, message) VALUES (:userId, :title, :message)", {
        userId: student.user_id,
        title: "Application submitted",
        message: "Your job application was submitted successfully."
      });
    }
    const [created] = await query("SELECT * FROM applications WHERE id = :id", { id: result.insertId });
    res.status(201).json(created);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new HttpError(409, "You have already applied for this job");
    }
    throw error;
  }
}

async function updateApplicationStatus(req, res, status, notificationTitle, notificationMessage) {
  const id = req.params.id;
  const [application] = await query(
    `SELECT applications.*, students.user_id AS student_user_id
     FROM applications
     JOIN students ON students.id = applications.student_id
     WHERE applications.id = :id`,
    { id }
  );

  if (!application) {
    throw new HttpError(404, "Application not found");
  }

  await query("UPDATE applications SET status = :status WHERE id = :id", { status, id });

  if (application.student_user_id) {
    await query("INSERT INTO notifications (user_id, title, message) VALUES (:userId, :title, :message)", {
      userId: application.student_user_id,
      title: notificationTitle,
      message: notificationMessage
    });
  }

  const [updated] = await query("SELECT * FROM applications WHERE id = :id", { id });
  res.json(updated);
}

export async function shortlistApplication(req, res) {
  await updateApplicationStatus(req, res, "SHORTLISTED", "Application shortlisted", "You have been shortlisted for the next round.");
}

export async function rejectApplication(req, res) {
  await updateApplicationStatus(req, res, "REJECTED", "Application rejected", "Your application was not selected for this role.");
}

export async function updateResult(req, res) {
  const { result, package_offered: packageOffered } = req.body;

  if (!["SELECTED", "REJECTED", "ON_HOLD"].includes(result)) {
    throw new HttpError(400, "Invalid result");
  }

  const id = req.params.id;
  await transaction(async (connection) => {
    const [[application]] = await connection.execute("SELECT * FROM applications WHERE id = ?", [id]);
    if (!application) {
      throw new HttpError(404, "Application not found");
    }
    await connection.execute("UPDATE applications SET status = ? WHERE id = ?", [result, id]);
    await connection.execute(
      `INSERT INTO placement_results (application_id, student_id, job_id, company_id, result, package_offered)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE result = VALUES(result), package_offered = VALUES(package_offered)`,
      [id, application.student_id, application.job_id, application.company_id, result, packageOffered || null]
    );
    if (result === "SELECTED") {
      await connection.execute("UPDATE students SET placement_status = 'PLACED' WHERE id = ?", [application.student_id]);
    }
  });

  const [updated] = await query("SELECT * FROM applications WHERE id = :id", { id });
  res.json(updated);
}

export async function deleteApplication(req, res) {
  await query("DELETE FROM applications WHERE id = :id", { id: req.params.id });
  res.json({ message: "Application deleted" });
}
