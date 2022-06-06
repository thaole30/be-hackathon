const {
  getProjectByIdRepo,
  createProjectRepo,
  updateProjectRepo,
  getAllProjectsRepo,
  getUserProjectsRepo,
} = require("../repositories/project");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { updateUserRepo, getUserByIdRepo } = require("../repositories/user");


const getAllProjectsService = () => {
  return getAllProjectsRepo();
}


const getProjectByIdService = (projectId) => {
    return getProjectByIdRepo(projectId);
}

const getUserProjectsService = (userId) => {
  return getUserProjectsRepo(userId);
}

const createProjectService = async (data) => {
  const newPro = await createProjectRepo(data);
  console.log("new proooooooo", newPro);
  const user = await getUserByIdRepo(newPro.creator);
  const userProjectIds = [...user.projectIds, newPro._id];
  await updateUserRepo(newPro.creator, {projectIds: userProjectIds});
  return newPro;
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
