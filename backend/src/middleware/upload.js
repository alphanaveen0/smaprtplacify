import fs from "node:fs";
import multer from "multer";
import { env } from "../config/env.js";
import { HttpError } from "../utils/http.js";

fs.mkdirSync(env.uploadDir, { recursive: true });

const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

export const resumeUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, env.uploadDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`)
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) {
      cb(new HttpError(400, "Only PDF, DOC, and DOCX resumes are allowed"));
      return;
    }
    cb(null, true);
  }
});
