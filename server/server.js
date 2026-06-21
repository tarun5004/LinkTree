import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/config/logger.js";
import { registerProcessHandlers } from "./src/shared/handlers/processHandlers.js";

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      logger.info({ port: env.PORT }, "Server is running");
    });

    server.on("error", (error) => {
      logger.fatal({ err: error }, "HTTP server error");
      process.exit(1);
    });

    registerProcessHandlers(server);
  } catch (error) {
    logger.fatal({ err: error }, "Failed to start server");
    process.exit(1);
  }
};

startServer();
