import mongoose from "mongoose";

const GlanceCardSchema = new mongoose.Schema({

  title: String,

  description: String,

  icon: String,

  order: Number,

  isActive: {
    type: Boolean,
    default: true
  }

});

export default mongoose.model(
  "GlanceCard",
  GlanceCardSchema
);