import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "../../config/env.js";
import { findOrCreateGoogleUser, findUserById } from "../user/user.service.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await findOrCreateGoogleUser(profile);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize the user ID to store in the session cookie. This is a simple way to keep track of the authenticated user across requests without storing the entire user object in the session, which can be inefficient and pose security risks if it contains sensitive information.
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize the user from the session cookie by looking up the user in the database using the stored user ID. This allows us to retrieve the full user object for use in our application after the user has been authenticated and their ID has been stored in the session.
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await findUserById(userId);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


export default passport;