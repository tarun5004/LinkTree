import mongoose from "mongoose";

const clickEventSchema = new mongoose.Schema(
  {
    clickedAt: {
      type: Date,
      default: Date.now,
    },
    referrer: {
      type: String,
      trim: true,
      default: "",
    },
    userAgent: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const linkSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastClickedAt: {
      type: Date,
      default: null,
    },
    clickEvents: {
      type: [clickEventSchema],
      default: [],
    },
  },
  { timestamps: true }
);

linkSchema.index({ owner: 1, createdAt: -1 });
linkSchema.index({ owner: 1, clicks: -1 });

export const Link = mongoose.model("Link", linkSchema);
