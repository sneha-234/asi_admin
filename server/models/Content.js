import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({

  title: {type: String,default: ""},
  subtitle: {type: String,default: ""},
  name: {type: String,default: ""},
  logo: {type: String,default: ""},
  isSection: {type: Boolean,default: false},
  order: {type: Number,default: 0},
  isActive: {type: Boolean,default: true},
  createdAt: {type: Date,default: Date.now}

});

const LeaderSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  initial: {
    type: String
  },

  quote1: {
    type: String
  },

  quote2: {
    type: String
  },

  isHighlighted: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  order: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const ContentSchema = new mongoose.Schema({

  page: {
    type: String,
    required: true
  },

  section: {
    type: String
  },

  key: {
    type: String,
    required: true
  },

  value: {
    type: String
  },

  type: {
    type: String,
    default: "text"
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }

});

const Brand = mongoose.model(
  "Brand",
  BrandSchema
);

const Leader = mongoose.model(
  "Leader",
  LeaderSchema
);

const Content = mongoose.model(
  "Content",
  ContentSchema
);

export {
  Brand,
  Leader,
  Content
};