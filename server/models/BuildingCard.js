import mongoose from "mongoose";

const BuildingCardSchema = new mongoose.Schema({

  title: String,

  description: String,

  image: String,

  order: Number,

  isActive: {
    type: Boolean,
    default: true
  }

});

export default mongoose.model(
  "BuildingCard",
  BuildingCardSchema
);