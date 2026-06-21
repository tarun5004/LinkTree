import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

// Create a child logger for database operations to keep logs organized and contextualized
const dbLogger = logger.child({ module: "database" });

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    dbLogger.info("Connected to MongoDB");
  } catch (error) {
    dbLogger.fatal({ err: error }, "Failed to connect to MongoDB");
    process.exit(1);
  }
};
