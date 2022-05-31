const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
    fieldname: "String",
    originalname: "String",
    encoding: "String",
    mimetype: "String",
    destination: "String",
    filename: "String",
    path: "String",
    size: Number,
    dateUpload: "Date",
    status: Boolean,
});
  

module.exports = mongoose.model("File", schema);
