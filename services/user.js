const {
    getUserByIdRepo,
    updateUserRepo,
    getUserByUsernameRepo
  } = require("../repositories/user");
  const md5 = require("md5");
  const jwt = require ('jsonwebtoken');
const { getProjectByQuery } = require("../repositories/project");

const getUserByIdService = (id) => {
    return getUserByIdRepo(id);
};

const getUserByUsernameService = async (userName) => {
    const user = await getUserByUsernameRepo(userName);
    // const userProjects = await getProjectByQuery({creator: user._id});
    // console.log("userProjects", userProjects);
    // const result = {...user._doc, userProjects: userProjects};
    return user;
    // return getUserByUsernameRepo(userName);
}

const updateUserService = (id, updatedInfo) => {
    return updateUserRepo(id, updatedInfo);
};

module.exports = {
    getUserByIdService,
    updateUserService,
    getUserByUsernameService
}