import { ZodError } from "zod";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";

const getStatusCode = (error) => {
  if (error.statusCode) return error.statusCode;
  if (error.name === "CastError") return 400;
  if (error.name === "ValidationError") return 400;
  if (error.code === 11000) return 409;
  if (error instanceof ZodError) return 400;

  return 500;
};

const getErrorDetails = (error) => {
  if (error instanceof ZodError) {
    return error.flatten().fieldErrors;
  }

  if (error.name === "ValidationError") {
    return Object.values(error.errors).map((item) => item.message);
  }

  if (error.code === 11000) {
    return error.keyValue;
  }

  return error.details ?? null;
};

export const errorHandler = (error, req, res, _next) => {
  const statusCode = getStatusCode(error);
  const isServerError = statusCode >= 500;

  const payload = {
    success: false,
    message: isServerError ? "Internal server error" : error.message,
    details: getErrorDetails(error),
  };

  if (env.NODE_ENV === "development") {
    payload.stack = error.stack;
  }

  logger[isServerError ? "error" : "warn"](
    {
      err: error,
      method: req.method,
      path: req.originalUrl,
      statusCode,
    },
    "Request failed"
  );

  res.status(statusCode).json(payload);
};
