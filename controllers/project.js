const mongoose = require('mongoose');
const Project = require('../models/project');
const md5 = require("md5");
const jwt = require ('jsonwebtoken');
const { createProjectService, updateProjectService, getProjectService } = require('../services/project');

const getProject = async (req, res) => {
    const {id} = req.params;
    console.log("getProject be id", id)

    try {
        const project = await getProjectService(id);
        console.log("exist project", project);
        res.status(200).json(project)

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}


const createProject = async (req, res) => {
    const data = req.body;
    try {
        const newProject = await createProjectService({...data, creator: req.decodedData.userId});
        res.status(200).json(newProject)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }

}

const updateProject = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No project with that id');

    const data = req.body;

    try {
        const updatedProject = await updateProjectService(id, data);
        res.status(200).json(updatedProject);
        
    } catch (error) {
        res.status(500).json({ err: error.message})   
    }
}



module.exports = {
    createProject,
    getProject,
    updateProject
}