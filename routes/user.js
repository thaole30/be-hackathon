const express = require('express');
const userRouter = express.Router();
const {signUp, signIn, updateUser, getUser} = require('../controllers/user');
const { registerUserSchema, updateUserSchema } = require('../middleware/validateSchema');
const { verifyTokenAndAuthorization } = require('../middleware/verify');
const { containerErr } = require('../utils/containerErr');

userRouter.post('/signup',registerUserSchema, containerErr(signUp));
userRouter.post('/signin', containerErr(signIn));
userRouter.get('/',verifyTokenAndAuthorization, containerErr(getUser));
userRouter.post('/update', verifyTokenAndAuthorization, updateUserSchema, containerErr(updateUser));

module.exports = userRouter