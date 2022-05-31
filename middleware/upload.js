const mongoose = require('mongoose');
const md5 = require("md5");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("destination");
      cb(null, process.cwd()+"/uploads");
    },
    filename: function (req, file, cb) {
      console.log("file", file);
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
})

const uploads = multer({
    storage: storage,
});

module.exports = {uploads}