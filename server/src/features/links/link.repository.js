import { Link } from "./link.model.js";

export const findLinksByOwner = (ownerId) => {
  return Link.find({ owner: ownerId }).sort({ createdAt: -1 }).lean();
};

export const findActiveLinksByOwner = (ownerId) => {
  return Link.find({ owner: ownerId, isActive: true }).sort({ createdAt: -1 }).lean();
};

export const createOwnerLink = (ownerId, payload) => {
  return Link.create({
    ...payload,
    owner: ownerId,
  });
};

export const findOwnerLinkById = (ownerId, linkId) => {
  return Link.findOne({ _id: linkId, owner: ownerId });
};

export const updateOwnerLinkById = (ownerId, linkId, payload) => {
  return Link.findOneAndUpdate(
    { _id: linkId, owner: ownerId },
    { $set: payload },
    { new: true, runValidators: true }
  );
};

export const deleteOwnerLinkById = (ownerId, linkId) => {
  return Link.findOneAndDelete({ _id: linkId, owner: ownerId });
};

export const incrementLinkClick = (linkId, clickEvent) => {
  return Link.findOneAndUpdate(
    { _id: linkId, isActive: true },
    {
      $inc: { clicks: 1 },
      $set: { lastClickedAt: clickEvent.clickedAt },
      $push: {
        clickEvents: {
          $each: [clickEvent],
          $slice: -200,
        },
      },
    },
    { new: true }
  ).lean();
};
