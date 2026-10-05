import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/authRoutes.js";
import { applicationRoutes } from "./routes/applicationRoutes.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { eligibilityRoutes } from "./routes/eligibilityRoutes.js";
import { notificationRoutes } from "./routes/notificationRoutes.js";
import { resourceRoutes } from "./routes/resourceRoutes.js";
import { resumeRoutes } from "./routes/resumeRoutes.js";
import { errorHandler, notFound } from "./middleware/error.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "smartplacify-backend" }));
app.use("/api/auth", authRoutes);
app.use("/api/students", resourceRoutes("students", ["tpo", "student"]));
app.use("/api/companies", resourceRoutes("companies", ["tpo", "company"]));
app.use("/api/jobs", resourceRoutes("jobs", ["tpo", "company"]));
app.use("/api/applications", applicationRoutes);
app.use("/api/interviews", resourceRoutes("interviews", ["tpo", "company"]));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", eligibilityRoutes);
app.use("/api", resumeRoutes);
app.use(notFound);
app.use(errorHandler);
