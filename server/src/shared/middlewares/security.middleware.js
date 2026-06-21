import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";

export const setupMiddlewares = (app) => {
  app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }));
  
};
