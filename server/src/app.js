import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { routes } from "./routes.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";
import { notFoundHandler } from "./shared/middlewares/notFoundHandler.js";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan(env.NODE_ENV === "development" ? "dev" : "combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
