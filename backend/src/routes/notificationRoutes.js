import { Router } from "express";
import { listNotifications, markNotificationRead } from "../controllers/notificationController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export const notificationRoutes = Router();

notificationRoutes.get("/", requireAuth, asyncHandler(listNotifications));
notificationRoutes.put("/:id/read", requireAuth, asyncHandler(markNotificationRead));
