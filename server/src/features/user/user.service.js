import { User } from "./user.model.js";
import { AppError } from "../../shared/errors/AppError.js";

const createUsernameFromEmail = (email) => {
  return email.split("@")[0].toLowerCase().replace(/[^a-z0-9_-]/g, "");  // Remove invalid characters and convert to lowercase
};

export const findOrCreateGoogleUser = async (profile) => {
  const email = profile.emails?.[0]?.value;  // Get the email from the profile, if available
  const avatar = profile.photos?.[0]?.value; // Get the avatar URL from the profile, if available

  if (!email) {
    throw new Error("Google account email not found");
  }

  const existingUser = await User.findOne({
    $or: [{ googleId: profile.id }, { email }], // Check if a user with the same Google ID or email already exists
  });

  if (existingUser) {
    return existingUser;
  }

  return User.create({
    googleId: profile.id,
    name: profile.displayName,
    email,
    avatar,
    username: createUsernameFromEmail(email),
    provider: "google",
  });
};

export const findUserById = async (userId) => {
  return User.findById(userId).select("-__v");  // Find a user by their ID and exclude the __v field from the result mean that the function will return the user document without the __v field, which is a version key added by Mongoose for internal use.
};

export const findUserByUsername = async (username) => {
  return User.findOne({
    username: username.toLowerCase(),
    isActive: true,
  }).select("-__v");
};

export const updateUserUsername = async (userId, username) => {
  const nextUsername = username.toLowerCase();
  const existingUser = await User.findOne({
    username: nextUsername,
    _id: { $ne: userId },
  }).select("_id");

  if (existingUser) {
    throw new AppError("This public link is already taken", 409);
  }

  return User.findByIdAndUpdate(
    userId,
    { $set: { username: nextUsername } },
    { new: true, runValidators: true }
  ).select("-__v");
};
