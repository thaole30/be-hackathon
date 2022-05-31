const {
    getUserByIdRepo,
    updateUserRepo,
  } = require("../repositories/user");
  const md5 = require("md5");
  const jwt = require ('jsonwebtoken');

const getUserService = (id) => {
    return getUserByIdRepo(id);
};


const updateUserService = (id, updatedInfo) => {
    return updateUserRepo(id, updatedInfo);
};

module.exports = {
    getUserService,
    updateUserService,
}