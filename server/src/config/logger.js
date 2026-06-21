import pino from "pino";
import { env } from "./env.js";

const isDevelopment = env.NODE_ENV === "development";

export const logger = pino({
  level: env.LOGGER_LEVEL,

  base: {
    service: "linktree-api",
    env: env.NODE_ENV,
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "token",
      "accessToken",
      "refreshToken",
      "jwt",
      "secret",
      "GOOGLE_CLIENT_SECRET",
      "JWT_ACCESS_SECRET",
      "JWT_REFRESH_SECRET",
      "req.body.password",
      "req.body.token",
      "req.body.accessToken",
      "req.body.refreshToken",
    ],
    censor: "[REDACTED]",
  },

  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
          singleLine: true,
        },
      }
    : undefined,
});
