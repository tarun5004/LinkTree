import { Router } from "express";
import { requireAuth } from "../../shared/middlewares/auth.middleware.js";
import {
  createLink,
  deleteLink,
  getAnalytics,
  getProfile,
  getLinks,
  getPublicProfile,
  recordLinkClick,
  updateProfile,
  updateLink,
} from "./link.controller.js";

const router = Router();

router.get("/", requireAuth, getLinks);
router.post("/", requireAuth, createLink);
router.get("/profile", requireAuth, getProfile);
router.patch("/profile", requireAuth, updateProfile);
router.get("/analytics", requireAuth, getAnalytics);
router.get("/public/:username", getPublicProfile);
router.patch("/:id", requireAuth, updateLink);
router.delete("/:id", requireAuth, deleteLink);
router.post("/:id/click", recordLinkClick);

export const linkRoutes = router;
