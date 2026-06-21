import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import {
  createLinkSchema,
  linkIdParamsSchema,
  updateLinkSchema,
} from "./link.validation.js";
import {
  createUserLink,
  deleteUserLink,
  getUserLinkAnalytics,
  listUserLinks,
  trackLinkClick,
  updateUserLink,
} from "./link.service.js";

const getUserId = (req) => req.user._id.toString();

export const getLinks = asyncHandler(async (req, res) => {
  const links = await listUserLinks(getUserId(req));

  res.status(200).json({
    success: true,
    links,
  });
});

export const createLink = asyncHandler(async (req, res) => {
  const { body } = createLinkSchema.parse({ body: req.body });
  const link = await createUserLink(getUserId(req), body);

  res.status(201).json({
    success: true,
    link,
  });
});

export const updateLink = asyncHandler(async (req, res) => {
  const { params, body } = updateLinkSchema.parse({
    params: req.params,
    body: req.body,
  });
  const link = await updateUserLink(getUserId(req), params.id, body);

  res.status(200).json({
    success: true,
    link,
  });
});

export const deleteLink = asyncHandler(async (req, res) => {
  const { params } = linkIdParamsSchema.parse({ params: req.params });
  const deletedLink = await deleteUserLink(getUserId(req), params.id);

  res.status(200).json({
    success: true,
    link: deletedLink,
  });
});

export const recordLinkClick = asyncHandler(async (req, res) => {
  const { params } = linkIdParamsSchema.parse({ params: req.params });
  const result = await trackLinkClick(params.id, {
    referrer: req.get("referer"),
    userAgent: req.get("user-agent"),
  });

  res.status(200).json({
    success: true,
    link: result,
  });
});

export const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await getUserLinkAnalytics(getUserId(req));

  res.status(200).json({
    success: true,
    analytics,
  });
});
