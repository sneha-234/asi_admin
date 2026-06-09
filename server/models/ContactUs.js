import mongoose from "mongoose";

const ContactFeatureSchema =
new mongoose.Schema({

  icon:String,

  title:String,

  subtitle:String,

  buttonText:String

});

const ContactPageSchema =
new mongoose.Schema({

  heading:String,

  subheading:String,

  bannerImage:String,

  features:[ContactFeatureSchema]

});

export default mongoose.model(
  "ContactPage",
  ContactPageSchema
);