import { Router } from "express";
import { healthRoutes } from "./features/health/health.routes.js";

const router = Router();

router.use("/health", healthRoutes);

export const routes = router;
