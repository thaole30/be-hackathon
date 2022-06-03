const mongoose = require('mongoose');
const Project = require('../models/project');
const md5 = require("md5");
const jwt = require ('jsonwebtoken');
const { createProjectService, updateProjectService, getProjectByIdService, getAllProjectsService, getUserProjectsService} = require('../services/project');



const getAllProjects = async (req, res) => {
    const projects = await getAllProjectsService();
    res.status(200).json(projects).end();
}


const getProject = async (req, res) => {
    const {id} = req.params;
    console.log("getProject be id", id)

    const project = await getProjectByIdService(id);
    console.log("exist project", project);
    res.status(200).json(project)

}


const getUserProjects = async (req, res) => {
    const userId = req.decodedData.userId;
    console.log("userId", userId);
    const projects = await getUserProjectsService(userId);
    res.status(200).json(projects).end();
}


const createProject = async (req, res) => {
    const data = req.body;
    
    const newProject = await createProjectService({...data, creator: req.decodedData.userId});
    res.status(200).json(newProject)
}

const updateProject = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No project with that id');

    const data = req.body;

    const updatedProject = await updateProjectService(id, data);
    res.status(200).json(updatedProject);

}



module.exports = {
    createProject,
    getProject,
    updateProject,
    getAllProjects,
    getUserProjects
}