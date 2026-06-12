import mongoose from "mongoose";

const GlanceCardSchema =
  new mongoose.Schema({

    content: String,

    isActive: {
      type: Boolean,
      default: true
    }

  });

export default mongoose.model(
  "GlanceCard",
  GlanceCardSchema
);