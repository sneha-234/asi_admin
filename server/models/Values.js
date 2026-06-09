import mongoose from "mongoose";

const valueSchema =
new mongoose.Schema({

  title: String,

  subtitle: String,

  description: String,

  icon: String

},
{
  timestamps: true
});

export default mongoose.model(
  "Value",
  valueSchema
);