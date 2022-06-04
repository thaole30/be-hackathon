const md5 = require('md5');
const mongoose = require('mongoose');
const Project = require('../models/project');


const getAllProjectsRepo = async () => {
    const projects = await Project.find();
    return projects;
  }

const getProjectByIdRepo =  async(id) => {
    const project = await Project.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('creator', 'name img')
    return project
}

const getUserProjectsRepo = async (userId) => {
  const projects = await Project.find({creator: userId});
  return projects;
}


const createProjectRepo = async (data) => {
    const newProject = new Project(data);
    await newProject.save();
    console.log("newProject", newProject);
    return newProject;
};


const updateProjectRepo = async (id, updatedInfo) => {
    console.log("id in repo", id);
    // const updatedProject = await Project.findByIdAndUpdate(id, updatedInfo);
    const updatedProject = await Project.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, updatedInfo);
    console.log("updatedProject in repo", updatedProject);
    return updatedProject
  };
  



module.exports = {
    getProjectByIdRepo,
    createProjectRepo,
    updateProjectRepo,
    getAllProjectsRepo,
    getUserProjectsRepo
}