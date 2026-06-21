import { env } from "../../config/env.js";
import { generateAuthTokens } from "./auth.service.js";
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from "./auth.cookie.js";

const getAllowedRedirectOrigins = () => {
  const corsOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
  const redirectOrigin = new URL(env.CLIENT_REDIRECT_URL).origin;

  return new Set([...corsOrigins, redirectOrigin]);
};

const getClientRedirectUrl = (redirectTo) => {
  if (!redirectTo) {
    return env.CLIENT_REDIRECT_URL;
  }

  try {
    const url = new URL(redirectTo);
    const allowedOrigins = getAllowedRedirectOrigins();

    if (allowedOrigins.has(url.origin)) {
      return url.origin;
    }
  } catch {
    return env.CLIENT_REDIRECT_URL;
  }

  return env.CLIENT_REDIRECT_URL;
};

export const handleGoogleCallback = (req, res) => {
    // Generate access and refresh tokens for the authenticated user. The generateAuthTokens function will create a short-lived access token for authorizing API requests and a long-lived refresh token for obtaining new access tokens when needed.
  const { accessToken, refreshToken } = generateAuthTokens(req.user);
  const clientRedirectUrl = getClientRedirectUrl(req.query.state);

  setRefreshTokenCookie(res, refreshToken);

  res.redirect(`${clientRedirectUrl}/auth/callback?accessToken=${accessToken}`);
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
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
};
