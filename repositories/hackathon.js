const md5 = require('md5');
const mongoose = require('mongoose');
const Hackathon = require('../models/hackathon');


const getAllHackathonsRepo = async () => {
    const hackathons = await Hackathon.find();
    return hackathons;
  }

const getHackathonByIdRepo =  async(id) => {
    const hackathon = await Hackathon.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('creator', 'name img')
    return hackathon
}


const getHackathonByQuery = async(query) => {
  const result = await Hackathon.find(query);
  return result;
}

const getUserHackathonsRepo = async (userId) => {
  const hackathons = await Hackathon.find({creator: userId}).populate('creator', 'name img')
  return hackathons;
}


const createHackathonRepo = async (data) => {
    const newHackathon = new Hackathon(data);
    await newHackathon.save();
    console.log("newHackathon", newHackathon);
    return newHackathon;
};


const updateHackathonRepo = async (id, updatedInfo) => {
    console.log("id in repo", id);
    // const updatedHackathon = await Hackathon.findByIdAndUpdate(id, updatedInfo);
    const updatedHackathon = await Hackathon.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, updatedInfo);
    console.log("updatedHackathon in repo", updatedHackathon);
    return updatedHackathon
  };
  



module.exports = {
    getHackathonByIdRepo,
    createHackathonRepo,
    updateHackathonRepo,
    getAllHackathonsRepo,
    getUserHackathonsRepo,
    getHackathonByQuery
}