import express from "express";
import { setupMiddlewares } from "./shared/middlewares/security.middleware.js";
import { routes } from "./routes.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";
import { notFoundHandler } from "./shared/middlewares/notFoundHandler.js";
import session from "express-session";
import passport from "./features/auth/passport.js";
import { env } from "./config/env.js";

const app = express();
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
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
