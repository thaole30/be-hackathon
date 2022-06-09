const {
    getUserByIdRepo,
    updateUserRepo,
    getUserByUsernameRepo,
    logInWithGoogleRepo
  } = require("../repositories/user");
  const md5 = require("md5");
  const jwt = require ('jsonwebtoken');
const { getProjectByQuery } = require("../repositories/project");
const redisClient = require("redis").createClient();
const { default: axios } = require("axios");
const User = require('../models/user');



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

const handleTokenGoogleService = async (token) => {
    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;

    try {
        const result = await axios.get(url);
        // console.log("result", result);
        return result.data;
    
    } catch (error) {
        console.log("error", error);
    
    }
}



const logInWithGoogleService = async (formData) => {
    console.log("formData", formData);
    const existingUser = await User.findOne({email: formData.email});
    console.log("existingUser", existingUser)

    if(existingUser) {
        return existingUser;
    };

    return logInWithGoogleRepo(formData);     //giống vs signUpbth
}

module.exports = {
    getUserByIdService,
    updateUserService,
    getUserByUsernameService,
    handleTokenGoogleService,
    logInWithGoogleService
}