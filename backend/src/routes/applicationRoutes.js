import { Router } from "express";
import { createApplication, deleteApplication, getApplication, listApplications, rejectApplication, shortlistApplication, updateResult } from "../controllers/applicationController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const applicationRoutes = Router();

applicationRoutes.use(requireAuth);
applicationRoutes.get("/", asyncHandler(listApplications));
applicationRoutes.post("/", asyncHandler(createApplication));
applicationRoutes.get("/:id", asyncHandler(getApplication));
applicationRoutes.put("/:id/shortlist", requireRole("company", "tpo"), asyncHandler(shortlistApplication));
applicationRoutes.put("/:id/reject", requireRole("company", "tpo"), asyncHandler(rejectApplication));
applicationRoutes.put("/:id/result", requireRole("company", "tpo"), asyncHandler(updateResult));
applicationRoutes.delete("/:id", requireRole("company", "tpo"), asyncHandler(deleteApplication));
