import mongoose from "mongoose";
import { logger } from "../../config/logger.js";

export const registerProcessHandlers = (server) => {
  const shutdown = async (signal) => {
    logger.info({ signal }, "Shutdown signal received");

    server.close(async () => {
      try {
        await mongoose.connection.close();
        logger.info("HTTP server and MongoDB connection closed");
        process.exit(0);
      } catch (error) {
        logger.fatal({ err: error }, "Failed during graceful shutdown");
        process.exit(1);
      }
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("unhandledRejection", (reason) => {
    logger.fatal({ err: reason }, "Unhandled promise rejection");
    shutdown("unhandledRejection");
  });

  process.on("uncaughtException", (error) => {
    logger.fatal({ err: error }, "Uncaught exception");
    process.exit(1);
  });
};
