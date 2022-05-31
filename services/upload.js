const { postFileUploadRepo, getUploadFileRepo } = require("../repositories/upload")


const postFileUploadService = (file) => {
    return postFileUploadRepo(file)
}

const getUploadFileService = (id) => {
    return getUploadFileRepo(id);
}


module.exports = {
    postFileUploadService,
    getUploadFileService
}