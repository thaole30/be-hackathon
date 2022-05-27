const express = require('express');
const userRouter = express.Router();
const {signUp, signIn, updateUser} = require('../controllers/user');
const { verifyTokenAndAuthorization } = require('../middleware/verify');

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.post('/update', verifyTokenAndAuthorization, updateUser);

module.exports = userRouter