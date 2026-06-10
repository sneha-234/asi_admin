import mongoose from "mongoose";

const termsSchema =
new mongoose.Schema({

  content: String

},
{
  timestamps: true
});

export default mongoose.model(
  "TermsConditions",
  termsSchema
);