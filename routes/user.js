const express = require('express');
const userRouter = express.Router();
const {signUp, signIn, updateUser, getUser, getUserByUsername, handleTokenUserGoogle, logInWithGoogle} = require('../controllers/user');
const { registerUserSchema, updateUserSchema } = require('../middleware/validateSchema');
const { verifyTokenAndAuthorization } = require('../middleware/verify');
const { containerErr } = require('../utils/containerErr');

userRouter.post('/signup', containerErr(signUp));
userRouter.post('/signin', containerErr(signIn));
userRouter.post("/login/google/:token", handleTokenUserGoogle);
userRouter.post('/logInWithGoogle', logInWithGoogle);
userRouter.get('/getUserByUsername/:userName', containerErr(getUserByUsername));
userRouter.get('/getLoginUser',verifyTokenAndAuthorization, containerErr(getUser));
userRouter.get('/', containerErr(getUser));
userRouter.post('/update', verifyTokenAndAuthorization, updateUserSchema, containerErr(updateUser));

module.exports = userRouter













