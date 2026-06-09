import mongoose from "mongoose";

const CustomerPageSchema =
new mongoose.Schema({

  sections: [

    {

      heading: {
        type: String,
        default: ""
      },

      subheading: {
        type: String,
        default: ""
      }

    }

  ]

});

export default mongoose.model(
  "CustomerPage",
  CustomerPageSchema
);