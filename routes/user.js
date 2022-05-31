const express = require('express');
const userRouter = express.Router();
const {signUp, signIn, updateUser, getUser} = require('../controllers/user');
const { verifyTokenAndAuthorization } = require('../middleware/verify');

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/',verifyTokenAndAuthorization, getUser);
userRouter.post('/update', verifyTokenAndAuthorization, updateUser);

module.exports = userRouter