import { Router } from "express";
import { listResumes, uploadResume } from "../controllers/resumeController.js";
import { requireAuth } from "../middleware/auth.js";
import { resumeUpload } from "../middleware/upload.js";
import { asyncHandler } from "../utils/http.js";

export const resumeRoutes = Router();

resumeRoutes.get("/students/:studentId/resumes", requireAuth, asyncHandler(listResumes));
resumeRoutes.post("/students/:studentId/resumes", requireAuth, resumeUpload.single("resume"), asyncHandler(uploadResume));
