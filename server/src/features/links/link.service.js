import { AppError } from "../../shared/errors/AppError.js";
import {
  createOwnerLink,
  deleteOwnerLinkById,
  findLinksByOwner,
  findOwnerLinkById,
  incrementLinkClick,
  updateOwnerLinkById,
} from "./link.repository.js";

const toLinkDto = (link) => ({
  id: link._id.toString(),
  title: link.title,
  url: link.url,
  description: link.description,
  isActive: link.isActive,
  clicks: link.clicks,
  lastClickedAt: link.lastClickedAt,
  createdAt: link.createdAt,
  updatedAt: link.updatedAt,
});

const createWeeklyBuckets = () => {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - (6 - index));

    return {
      key: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      clicks: 0,
    };
  });
};

export const listUserLinks = async (userId) => {
  const links = await findLinksByOwner(userId);
  return links.map(toLinkDto);
};

export const createUserLink = async (userId, payload) => {
  const link = await createOwnerLink(userId, payload);
  return toLinkDto(link);
};

export const updateUserLink = async (userId, linkId, payload) => {
  const link = await updateOwnerLinkById(userId, linkId, payload);

  if (!link) {
    throw new AppError("Link not found", 404);
  }

  return toLinkDto(link);
};

export const deleteUserLink = async (userId, linkId) => {
  const link = await deleteOwnerLinkById(userId, linkId);

  if (!link) {
    throw new AppError("Link not found", 404);
  }

  return { id: link._id.toString() };
};

export const trackLinkClick = async (linkId, metadata) => {
  const link = await incrementLinkClick(linkId, {
    clickedAt: new Date(),
    referrer: metadata.referrer || "",
    userAgent: metadata.userAgent || "",
  });

  if (!link) {
    throw new AppError("Link not found or inactive", 404);
  }

  return {
    id: link._id.toString(),
    url: link.url,
    clicks: link.clicks,
  };
};

export const getUserLinkAnalytics = async (userId) => {
  const links = await findLinksByOwner(userId);
  const buckets = createWeeklyBuckets();
  const bucketMap = new Map(buckets.map((bucket) => [bucket.key, bucket]));

  for (const link of links) {
    for (const event of link.clickEvents || []) {
      const key = new Date(event.clickedAt).toISOString().slice(0, 10);
      const bucket = bucketMap.get(key);

      if (bucket) {
        bucket.clicks += 1;
      }
    }
  }

  const topLinks = [...links]
    .sort((first, second) => second.clicks - first.clicks)
    .slice(0, 5)
    .map(toLinkDto);

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return {
    totalLinks: links.length,
    activeLinks: links.filter((link) => link.isActive).length,
    totalClicks,
    topLink: topLinks[0] || null,
    topLinks,
    weeklyClicks: buckets,
  };
};
