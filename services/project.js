const {
  getProjectByIdRepo,
  createProjectRepo,
  updateProjectRepo,
} = require("../repositories/project");
const md5 = require("md5");
const jwt = require("jsonwebtoken");


const getProjectService = (projectId) => {
    return getProjectByIdRepo(projectId);
}


const createProjectService = (data) => {
  return createProjectRepo(data);
};

const updateProjectService = (id, data) => {
  return updateProjectRepo(id, data);
};

module.exports = {
  getProjectService,
  createProjectService,
  updateProjectService
};
