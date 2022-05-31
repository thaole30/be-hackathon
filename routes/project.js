const express = require('express');
const { createProject, getProject, updateProject } = require('../controllers/project');
const projectRouter = express.Router();
const { verifyTokenAndAuthorization } = require('../middleware/verify');

projectRouter.get('/:id', getProject);
projectRouter.post('/', verifyTokenAndAuthorization, createProject);
projectRouter.post('/:id', verifyTokenAndAuthorization, updateProject);




module.exports = projectRouter