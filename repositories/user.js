const md5 = require('md5');
const mongoose = require('mongoose');
const User = require('../models/user');


const getUserByIdRepo =  async(id) => {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) })
    return user
}

const getUserByUsernameRepo = async(userName) => {
    const user = await User.findOne({ name: userName }).populate("projectIds").populate("myHackathons");
    return user
}

const updateUserRepo = async (id, updatedInfo) => {
    console.log("id in repo", id);
    // const updatedUser = await User.findByIdAndUpdate(id, updatedInfo);
    const updatedUser = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, updatedInfo, {new: true});
    console.log("updatedUser in repo", updatedUser);
    return updatedUser
  };
  

const logInWithGoogleRepo = async(formData) => {
    const newUser = await new User({
        ...formData,
        img: `https://i.pravatar.cc/150?u=${formData.firstName}${formData.lastName}`,
        name: `${formData.firstName}${formData.lastName}`,
    });

    const savedUser = await newUser.save();
    console.log("savedUser", savedUser._doc);
    const {...others} = savedUser._doc;

    return savedUser._doc;
  
}

module.exports = {
    getUserByIdRepo,
    updateUserRepo,
    getUserByUsernameRepo,
    logInWithGoogleRepo
}