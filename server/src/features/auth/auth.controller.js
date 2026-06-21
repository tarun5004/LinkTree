import { env } from "../../config/env.js";
import { generateAuthTokens } from "./auth.service.js";
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from "./auth.cookie.js";

export const handleGoogleCallback = (req, res) => {
    // Generate access and refresh tokens for the authenticated user. The generateAuthTokens function will create a short-lived access token for authorizing API requests and a long-lived refresh token for obtaining new access tokens when needed.
  const { accessToken, refreshToken } = generateAuthTokens(req.user);

  setRefreshTokenCookie(res, refreshToken);

  res.redirect(`${env.CLIENT_REDIRECT_URL}/auth/callback?accessToken=${accessToken}`);
};

export const logout = (req, res) => {
  clearRefreshTokenCookie(res);

  req.logout(() => {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};

export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};