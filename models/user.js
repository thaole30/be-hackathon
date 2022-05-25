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
    email: {
      type: String,
      trim: true,
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
  });

module.exports = mongoose.model("User", UserSchema);
