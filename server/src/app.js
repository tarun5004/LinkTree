import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { setupMiddlewares } from "./shared/middlewares/security.middleware.js";
import { routes } from "./routes.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";
import { notFoundHandler } from "./shared/middlewares/notFoundHandler.js";
import session from "express-session";
import passport from "./features/auth/passport.js";
import { env } from "./config/env.js";

const app = express();
const clientDistPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../client/dist"
);
const clientIndexPath = path.join(clientDistPath, "index.html");
const hasClientBuild = fs.existsSync(clientIndexPath);

setupMiddlewares(app);

app.use(
  session({
    secret: env.SESSION_SECRET || env.JWT_REFRESH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/api", routes);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(clientIndexPath);
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
