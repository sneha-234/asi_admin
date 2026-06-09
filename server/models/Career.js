import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  department:{
    type:String,
    default:"Sales"
  },

  type:{
    type:String,
    default:"Full-Time"
  },

  location:{
    type:String,
    default:"New Palasia, Indore"
  },

  description:String,

  isActive:{
    type:Boolean,
    default:true
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

const ApplicationSchema = new mongoose.Schema({

  fullName:{
    type:String,
    required:true
  },

  email:String,

  phone:String,

  position:String,

  resumeLink:String,

  coverLetter:String,

  status:{
    type:String,
    default:"new"
  },

  appliedAt:{
    type:Date,
    default:Date.now
  }

});

const CareerPageSchema =
new mongoose.Schema({

  heading:String,

  subheading:String,

  bannerImage:String,

  features:[

    {

      icon:String,

      title:String,

      subtitle:String

    }

  ]

});

export const Career =
mongoose.model(
  "Career",
  CareerSchema
);

export const Application =
mongoose.model(
  "Application",
  ApplicationSchema
);

export const CareerPage =
mongoose.model(
  "CareerPage",
  CareerPageSchema
);