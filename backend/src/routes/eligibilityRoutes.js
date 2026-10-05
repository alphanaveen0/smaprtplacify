import { Router } from "express";
import { getEligibility } from "../controllers/eligibilityController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const eligibilityRoutes = Router();

eligibilityRoutes.get("/jobs/:jobId/eligibility/:studentId", requireAuth, asyncHandler(getEligibility));
