import mongoose from "mongoose";

const WhyChooseUsSchema =
new mongoose.Schema({

  heading:{
    type:String,
    default:""
  },

  subheading:{
    type:String,
    default:""
  },

  backgroundImage:{
    type:String,
    default:""
  },

  sections:[
    {
      content:{
        type:String,
        default:""
      }
    }
  ]

},{
  timestamps:true
});

export default mongoose.model(
  "WhyChooseUs",
  WhyChooseUsSchema
);