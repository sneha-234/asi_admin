import mongoose from "mongoose";

const privacyPolicySchema =
new mongoose.Schema({

  content: String

},
{
  timestamps: true
});

export default mongoose.model(
  "PrivacyPolicy",
  privacyPolicySchema
);