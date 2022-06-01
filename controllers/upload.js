const mongoose = require('mongoose');
const md5 = require("md5");
const jwt = require ('jsonwebtoken');
const { postFileUploadService, getUploadFileService } = require('../services/upload');


const postUploadFile = async (req, res) => {
    const file = req.file;
    console.log("input file",file);
    if (!file) {
      res.send("Please uploads a file");
      return;
    }
    const result = await postFileUploadService(file);
    console.log("result file", result);
    const {_id: fileId} = result._doc;
    console.log("fileId", fileId);
    // console.log(`${process.env.URL_SERVER}uploads/${fileId}`)
    res.send(`${process.env.URL_SERVER}uploads/${fileId}`);
    // res.send(`http://localhost:7000/uploads/${fileId}`);
}

const getUploadFile = async (req, res) => {
  console.log("file id", req.params.id)
  let meta = await getUploadFileService(req.params.id);
  console.log(meta);
  const dir = `/uploads/${meta.filename}`;
  res.sendFile(process.cwd() + dir);
};

module.exports = {
    postUploadFile,
    getUploadFile
}