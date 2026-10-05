import { Router } from "express";
import { createResource, deleteResource, getResource, listResource, updateResource } from "../controllers/resourceController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

export function resourceRoutes(resource, roles = ["tpo"]) {
  const router = Router();
  router.use(requireAuth);
  router.get("/", asyncHandler(listResource(resource)));
  router.get("/:id", asyncHandler(getResource(resource)));
  router.post("/", requireRole(...roles), asyncHandler(createResource(resource)));
  router.put("/:id", requireRole(...roles), asyncHandler(updateResource(resource)));
  router.delete("/:id", requireRole(...roles), asyncHandler(deleteResource(resource)));
  return router;
}
