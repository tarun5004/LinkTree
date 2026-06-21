import { Router } from "express";
import passport from "./passport.js";
import { getMe, handleGoogleCallback, logout } from "./auth.controller.js";

const router = Router();

router.get(
  "/google",
  (req, res, next) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: req.query.redirectTo,
    })(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/google/failure",
  }),
  handleGoogleCallback
);

router.get("/google/failure", (_req, res) => {
  res.status(401).json({
    success: false,
    message: "Google authentication failed",
  });
});

router.get("/me", getMe);

router.post("/logout", logout);

export const authRoutes = router;
