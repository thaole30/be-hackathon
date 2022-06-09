const mongoose = require("mongoose");
const { Schema } = mongoose;

const HackathonSchema = Schema({
  name: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "https://crowdhack.io/static/media/thumbnail-placeholder.e45c0561.jpg",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  tagline: {
    type: String,
    default: "",
  },
  managerContact: {
    type: String,
    default: "",
  },
  hostingOrganization: {
    type: String,
    default: "",
  },
  host: {
    type: String,
    default: "",
  },
  themeTags: {
    type: Array,
    default: [],
  },
  hktType: {
    type: String,
    default: "",
  },
  locationName: {
    type: String,
    default: "",
  },
  locationAddress: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "draft",
  },
  participants: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
  },
  prize: {
    type: Array,
    default: "",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPresentable: {
    type: Boolean,
    default: false,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Hackathon", HackathonSchema);
