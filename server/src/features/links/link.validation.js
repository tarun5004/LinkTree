import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid link id");

const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Public link must be at least 3 characters")
  .max(30, "Public link must be at most 30 characters")
  .regex(
    /^[a-z0-9](?:[a-z0-9_-]*[a-z0-9])?$/,
    "Use lowercase letters, numbers, hyphens, and underscores only"
  );

const urlSchema = z
  .string()
  .trim()
  .url("Enter a valid URL starting with http:// or https://")
  .refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "Only http:// and https:// links are allowed");

const linkPayloadSchema = z.object({
  title: z.string().trim().min(2).max(80),
  url: urlSchema,
  description: z.string().trim().max(160).optional().default(""),
  isActive: z.boolean().optional(),
});

export const createLinkSchema = z.object({
  body: linkPayloadSchema,
});

export const updateLinkSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: linkPayloadSchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  }),
});

export const linkIdParamsSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const updatePublicProfileSchema = z.object({
  body: z.object({
    username: usernameSchema,
  }),
});

export const publicProfileParamsSchema = z.object({
  params: z.object({
    username: usernameSchema,
  }),
});
