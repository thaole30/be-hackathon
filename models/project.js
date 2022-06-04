const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = Schema({
  name: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  contribution: {
    type: String,
    default: "Ex: I worked on the back-end. It was my first time using Node, which was a little intimidating, but I learned a lot.",
  },
  img: {
    type: String,
    default: "https://crowdhack.io/static/media/thumbnail-placeholder.e45c0561.jpg",
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
    default: "draft",
  },
  tryOutLink: {
    type: String,
    default: "",
  },
  demoLink: {
    type: String,
    default: "",
  },
  action: {
    type: String,
    default: "",
  },
  viewers: {
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
  // creator: {
  //    type: String, 
  //    required: true 
  // },
  // creatorName: {
  //    type: String, 
  //    required: true 
  // },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
