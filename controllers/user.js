const mongoose = require("mongoose");
const User = require("../models/user");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const {
  updateUserService,
  getUserByIdService,
  getUserByUsernameService,
  handleTokenGoogleService,
  logInWithGoogleService,
} = require("../services/user");

const signUp = async (req, res) => {
  console.log("sign uppppppp");
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  console.log("check nbnnnn");

  const hashedPasswword = md5(password);
  console.log("hashedPasswword", hashedPasswword);
  const newUser = await new User({
    ...req.body,
    img: `https://i.pravatar.cc/150?u=${req.body.firstName}${req.body.lastName}`,
    name: `${req.body.firstName}${req.body.lastName}`,
    password: hashedPasswword,
  });

  const savedUser = await newUser.save();
  console.log("savedUser", savedUser._doc);
  const { password: userPassword, ...others } = savedUser._doc;

  console.log("checkkkkkkk");
  const token = jwt.sign(
    {
      email: savedUser.email,
      userId: savedUser._id,
      isAdmin: savedUser.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userInfo: others,
    token: token,
  });
};

const signIn = async (req, res) => {
  console.log("sign innnnn");
  const { email, password: enteredPassword } = req.body;

  const existingUser = await User.findOne({ email });
  console.log("existingUser", existingUser);

  if (!existingUser)
    return res.status(404).json({
      message: "User does not exist",
    });

  const isPasswordCorrect = md5(enteredPassword) === existingUser._doc.password;
  if (!isPasswordCorrect)
    return res.status(404).json({ message: "Password is incorrect" });

  const { password, ...others } = existingUser._doc;

  const token = jwt.sign(
    {
      email: existingUser.email,
      userId: existingUser._id,
      isAdmin: existingUser.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userInfo: others,
    token: token,
  });
};

const getUser = async (req, res) => {
  console.log("get user");
  try {
    const result = await getUserByIdService(req.decodedData.userId);
    console.log("result", result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "user not found!" });
  }
};
const getUserByUsername = async (req, res) => {
  console.log("get user by username");
  const { userName } = req.params;

  try {
    const result = await getUserByUsernameService(userName);
    console.log("result", result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "user not found!" });
  }
};

const updateUser = async (req, res) => {
  if (!req.decodedData.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  // console.log("req.body", req.body)
  const updatedUser = await updateUserService(req.decodedData.userId, req.body);
  console.log("updatedUser", updatedUser);

  const { password, ...others } = updatedUser._doc;

  console.log("updatedUser", updatedUser);

  const token = jwt.sign(
    {
      email: updatedUser.email,
      userId: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userInfo: others,
    token: token,
  });
};

const handleTokenUserGoogle = async (req, res) => {
  console.log("haklouuuu");
  const resultUserGoogle = await handleTokenGoogleService(req.params.token);
  console.log("result", resultUserGoogle);
  if (resultUserGoogle) {
      //!sign up from google info
    const necessaryUserInfo = {
      email: resultUserGoogle.email,
      firstName: resultUserGoogle.given_name,
      lastName: resultUserGoogle.family_name,
      isAdmin: false,
    };
    const resultInfo = await logInWithGoogleService(necessaryUserInfo);
    console.log("resultInfo", resultInfo);

    const token = jwt.sign(
      {
        email: resultInfo.email,
        userId: resultInfo._id,
        isAdmin: resultInfo.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      userInfo: resultInfo,
      token: token,
    });
  } else {
    return res.status(400).json({ message: "Error" }).end();
  }
};

const logInWithGoogle = async (req, res) => {
  const resultInfo = await logInWithGoogleService({
    email: req.body.email,
    isAdmin: false,
  });
  console.log("resultInfo", resultInfo);

  const token = jwt.sign(
    {
      email: resultInfo.email,
      userId: resultInfo._id,
      isAdmin: resultInfo.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userInfo: resultInfo,
    token: token,
  });
};

module.exports = {
  signUp,
  signIn,
  getUser,
  updateUser,
  getUserByUsername,
  handleTokenUserGoogle,
  logInWithGoogle,
};
