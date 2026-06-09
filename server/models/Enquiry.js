
import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({

  heading: {
    type: String,
    default: ""
  },

  subheading: {
    type: String,
    default: ""
  },

  bannerImage: {
    type: String,
    default: ""
  },

  type: {
    type: String,
    default: "contact"
  },

  name: {
    type: String,
    required: true
  },

  email: String,

  phone: String,

  company: String,

  subject: String,

  message: String,

  categories: {
    type: [String],
    default: []
  },

  quantity: String,

  location: String,

  status: {
    type: String,
    default: "new"
  },

  date: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model(
  "Enquiry",
  EnquirySchema
);

