const express = require('express');
const { postUploadFile, getUploadFile } = require('../controllers/upload');
const uploadRouter = express.Router();
const { verifyTokenAndAuthorization } = require('../middleware/verify');
const { uploads } = require("../middleware/upload");
const multer = require("multer");

uploadRouter.post('/', verifyTokenAndAuthorization, uploads.single("file"), postUploadFile);
uploadRouter.get('/:id', getUploadFile);




module.exports = uploadRouter