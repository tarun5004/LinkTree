import { Router } from "express";
import { requireAuth } from "../../shared/middlewares/auth.middleware.js";
import {
  createLink,
  deleteLink,
  getAnalytics,
  getLinks,
  recordLinkClick,
  updateLink,
} from "./link.controller.js";

const router = Router();

router.get("/", requireAuth, getLinks);
router.post("/", requireAuth, createLink);
router.get("/analytics", requireAuth, getAnalytics);
router.patch("/:id", requireAuth, updateLink);
router.delete("/:id", requireAuth, deleteLink);
router.post("/:id/click", recordLinkClick);

export const linkRoutes = router;
