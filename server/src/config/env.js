import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { z } from "zod";

const envFilePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.env"
);

dotenv.config({
  path: envFilePath,
  override: process.env.NODE_ENV !== "production",
});

// Custom schema for duration strings like "15m", "1h", "30d"
const durationSchema = z
  .string()
  .regex(/^\d+[smhd]$/, "Use duration format like 15m, 1h, or 30d");


//   Define the schema for environment variables
const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8000),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  MONGO_URI: z
    .string()
    .min(1, "MONGO_URI is required")
    .regex(/^mongodb(\+srv)?:\/\//, "MONGO_URI must be a valid MongoDB URI"),

  CORS_ORIGIN: z
    .string()
    .default("http://localhost:5173")
    .refine(
      (value) =>
        value
          .split(",")
          .map((origin) => origin.trim())
          .every((origin) => z.string().url().safeParse(origin).success),
      "CORS_ORIGIN must be a comma-separated list of valid URLs"
    ),

//   Define the schema for the logger level mean the level of logging that the application will use. The levels are defined as follows:
//   - fatal: Only log fatal errors that cause the application to crash.
//   - error: Log error messages that indicate a failure in the application.
//   - warn: Log warning messages that indicate potential issues or important events.
//   - info: Log informational messages that highlight the progress of the application.
//   - debug: Log detailed debugging information for development purposes.
//   - trace: Log very detailed information, including function calls and stack traces, for in-depth debugging.
//   - silent: Disable all logging.
  LOGGER_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),

  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  GOOGLE_CALLBACK_URL: z.string().url(),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),

  ACCESS_TOKEN_EXPIRES_IN: durationSchema.default("15m"),
  REFRESH_TOKEN_EXPIRES_IN: durationSchema.default("30d"),

  SESSION_SECRET: z.string().min(32).optional(),

  CLIENT_REDIRECT_URL: z.string().url(),
});

// Parse and validate environment variables against the schema mean that the application will check if the environment variables are set correctly according to the defined schema. If any variable is missing or does not match the expected format, it will log an error and exit the application to prevent it from running with invalid configuration.
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
