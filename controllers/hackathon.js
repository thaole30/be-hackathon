const mongoose = require('mongoose');
const Hackathon = require('../models/hackathon');
const md5 = require("md5");
const jwt = require ('jsonwebtoken');
const { createHackathonService, updateHackathonService, getHackathonByIdService, getAllHackathonsService, getUserHackathonsService} = require('../services/hackathon');



const getAllHackathons = async (req, res) => {
    const hackathons = await getAllHackathonsService();
    res.status(200).json(hackathons).end();
}


const getHackathonById = async (req, res) => {
    const {id} = req.params;
    console.log("getHackathon be id", id)

    const hackathon = await getHackathonByIdService(id);
    console.log("exist hackathon", hackathon);
    res.status(200).json(hackathon)

}


const getUserHackathons = async (req, res) => {
    const userId = req.decodedData.userId;
    console.log("userId", userId);
    const hackathons = await getUserHackathonsService(userId);
    res.status(200).json(hackathons).end();
}


const createHackathon = async (req, res) => {
    console.log("createeeeeeeeee")
    const data = req.body;
    
    const newHackathon = await createHackathonService({...data, creator: req.decodedData.userId});
    res.status(200).json(newHackathon)
}

const updateHackathon = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No hackathon with that id');

    const data = req.body;

    const updatedHackathon = await updateHackathonService(id, data);
    res.status(200).json(updatedHackathon);

}



module.exports = {
    createHackathon,
    getHackathonById,
    updateHackathon,
    getAllHackathons,
    getUserHackathons
}