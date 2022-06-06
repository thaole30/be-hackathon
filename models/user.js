const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "firstName must be required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "lastName must be required"],
  },
  name: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  linkedIn: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "email must be required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "password must be required"],
    minLength: [6, "password must be at least 5 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  specialty: {
    type: String,
    default: "",
  },
  skills: {
    type: Array,
    default: [],
  },
  interests: {
    type: Array,
    default: [],
  },

  location: {
    type: String,
  },
  occupation: {
    type: Number,
    default: 1,
  },
  employedInTech: {
    type: Boolean,
    default: true,
  },
  currentStudentLevel: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  workInTechMonth: {
    type: String,
  },
  workInTechYear: {
    type: String,
  },
  graduationMonth: {
    type: String,
  },
  graduationYear: {
    type: String,
  },
  birthMonth: {
    type: String,
  },
  birthYear: {
    type: String,
  },
  projectIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  myHackathons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
