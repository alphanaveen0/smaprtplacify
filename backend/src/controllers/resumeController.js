import { query } from "../config/db.js";
import { analyzeResume } from "../services/pythonService.js";
import { HttpError } from "../utils/http.js";

export async function uploadResume(req, res) {
  if (!req.file) {
    throw new HttpError(400, "Resume file is required");
  }

  const studentId = req.params.studentId;
  const analysis = await analyzeResume(req.file.path);
  const result = await query(
    `INSERT INTO resumes (student_id, original_name, file_path, mime_type, file_size, extracted_text, extracted_skills)
     VALUES (:studentId, :originalName, :filePath, :mimeType, :fileSize, :text, :skills)`,
    {
      studentId,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      text: analysis.extracted_text || "",
      skills: JSON.stringify(analysis.skills || [])
    }
  );

  res.status(201).json({ id: result.insertId, analysis });
}

export async function listResumes(req, res) {
  const rows = await query("SELECT id, student_id, original_name, mime_type, file_size, extracted_skills, uploaded_at FROM resumes WHERE student_id = :studentId ORDER BY uploaded_at DESC", {
    studentId: req.params.studentId
  });
  res.json(rows);
}
