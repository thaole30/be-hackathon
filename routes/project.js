const express = require('express');
const { createProject, getProject, updateProject, getAllProjects, getUserProjects } = require('../controllers/project');
const projectRouter = express.Router();
const { verifyTokenAndAuthorization } = require('../middleware/verify');
const { containerErr } = require('../utils/containerErr');

projectRouter.get('/', containerErr(getAllProjects));
projectRouter.get('/userProjects',verifyTokenAndAuthorization, containerErr(getUserProjects));
projectRouter.get('/:id', containerErr(getProject));
projectRouter.post('/', verifyTokenAndAuthorization, containerErr(createProject));
projectRouter.post('/:id', verifyTokenAndAuthorization, containerErr(updateProject));




module.exports = projectRouter