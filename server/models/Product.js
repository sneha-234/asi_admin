import mongoose from "mongoose";

const SectionSchema =
new mongoose.Schema({

  content: {

    type: String,

    default: ""

  }

});

const ProductPageSchema =
new mongoose.Schema({

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

  sections: {

    type: [SectionSchema],

    default: []

  }

},
{
  timestamps: true
});

export default mongoose.model(
  "ProductPage",
  ProductPageSchema
);