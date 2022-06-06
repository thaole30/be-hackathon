const express = require('express');
const { createHackathon, getHackathonById, updateHackathon, getAllHackathons, getUserHackathons } = require('../controllers/hackathon');
const hackathonRouter = express.Router();
const { verifyTokenAndAuthorization } = require('../middleware/verify');
const { containerErr } = require('../utils/containerErr');

hackathonRouter.get('/',  getAllHackathons);
hackathonRouter.get('/userHackathons',verifyTokenAndAuthorization,  getUserHackathons);
hackathonRouter.get('/:id', getHackathonById);
hackathonRouter.post('/', verifyTokenAndAuthorization, createHackathon);
hackathonRouter.post('/:id', verifyTokenAndAuthorization, updateHackathon);




module.exports = hackathonRouter