import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { findUserById } from "../../features/user/user.service.js";
import { AppError } from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getBearerToken = (authorization = "") => {
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const requireAuth = asyncHandler(async (req, _res, next) => {
  if (req.user) {
    return next();
  }

  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  let payload;

  try {
    payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
  } catch {
    throw new AppError("Invalid or expired session", 401);
  }

  const user = await findUserById(payload.userId);

  if (!user || !user.isActive) {
    throw new AppError("Authentication required", 401);
  }

  req.user = user;
  next();
});
