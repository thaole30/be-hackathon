const mongoose = require('mongoose');
const File = require('../models/file');


const postFileUploadRepo = async (file) => {
    try {
        const newFile = new File(file);
        await newFile.save();
        console.log("newFile", newFile);
        return newFile;

    } catch (error) {
        console.log("error", error);
    }
   
};

const getUploadFileRepo = async (id) => {
    const result = await File.findOne({ _id: mongoose.Types.ObjectId(id) });
    return result;
};


module.exports = {
    postFileUploadRepo,
    getUploadFileRepo
}
  
