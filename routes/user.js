const express = require('express');
const userRouter = express.Router();
const {signUp, signIn} = require('../controllers/user');

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);

module.exports = userRouter