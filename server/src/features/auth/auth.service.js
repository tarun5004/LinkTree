import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id, // Include only essential information in the refresh token to minimize its size and reduce security risks if it gets compromised. The refresh token should contain just enough information to identify the user and validate the token, without including sensitive data or excessive details.
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};


// Generate both access and refresh tokens for a user. This function will be called after a user successfully authenticates (e.g., logs in with Google) to create the necessary tokens for maintaining their session. The access token will be used for authorizing API requests, while the refresh token can be used to obtain new access tokens when the current one expires, without requiring the user to log in again.
export const generateAuthTokens = (user) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};