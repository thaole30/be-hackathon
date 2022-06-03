const {
  getProjectByIdRepo,
  createProjectRepo,
  updateProjectRepo,
  getAllProjectsRepo,
  getUserProjectsRepo,
} = require("../repositories/project");
const md5 = require("md5");
const jwt = require("jsonwebtoken");


const getAllProjectsService = () => {
  return getAllProjectsRepo();
}


const getProjectByIdService = (projectId) => {
    return getProjectByIdRepo(projectId);
}

const getUserProjectsService = (userId) => {
  return getUserProjectsRepo(userId);
}

const createProjectService = (data) => {
  return createProjectRepo(data);
};

const updateProjectService = (id, data) => {
  return updateProjectRepo(id, data);
};

module.exports = {
  getProjectByIdService,
  createProjectService,
  updateProjectService,
  getAllProjectsService,
  getUserProjectsService
};
