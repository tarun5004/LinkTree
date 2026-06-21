import { Router } from "express";
import { authRoutes } from "./features/auth/auth.routes.js";
import { healthRoutes } from "./features/health/health.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);

export const routes = router;
