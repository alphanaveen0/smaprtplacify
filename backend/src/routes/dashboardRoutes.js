import { Router } from "express";
import { companyDashboard, studentDashboard, tpoDashboard } from "../controllers/dashboardController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const dashboardRoutes = Router();

dashboardRoutes.get("/student", requireAuth, requireRole("student", "tpo"), asyncHandler(studentDashboard));
dashboardRoutes.get("/company", requireAuth, requireRole("company", "tpo"), asyncHandler(companyDashboard));
dashboardRoutes.get("/tpo", requireAuth, requireRole("tpo"), asyncHandler(tpoDashboard));
