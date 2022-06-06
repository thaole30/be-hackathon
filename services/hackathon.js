const {
    getHackathonByIdRepo,
    createHackathonRepo,
    updateHackathonRepo,
    getAllHackathonsRepo,
    getUserHackathonsRepo,
  } = require("../repositories/hackathon");
  const md5 = require("md5");
  const jwt = require("jsonwebtoken");
  const { updateUserRepo, getUserByIdRepo } = require("../repositories/user");
  
  
  const getAllHackathonsService = () => {
    return getAllHackathonsRepo();
  }
  
  
  const getHackathonByIdService = (hackathonId) => {
      return getHackathonByIdRepo(hackathonId);
  }
  
  const getUserHackathonsService = (userId) => {
    return getUserHackathonsRepo(userId);
  }
  
  const createHackathonService = async (data) => {
    const newHkt = await createHackathonRepo(data);
    console.log("new proooooooo", newHkt);
    const user = await getUserByIdRepo(newHkt.creator);
    const usermyHackathons = [...user.myHackathons, newHkt._id];
    await updateUserRepo(newHkt.creator, {myHackathons: usermyHackathons})
    return newHkt;
  };
  
  const updateHackathonService = (id, data) => {
    return updateHackathonRepo(id, data);
  };
  
  module.exports = {
    getHackathonByIdService,
    createHackathonService,
    updateHackathonService,
    getAllHackathonsService,
    getUserHackathonsService
  };
  