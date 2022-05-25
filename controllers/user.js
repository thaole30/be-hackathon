const mongoose = require('mongoose');
const User = require('../models/user');
const md5 = require("md5");
const jwt = require ('jsonwebtoken');


const signUp = async (req, res) => {
    console.log("sign uppppppp")
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email: email});

        if(existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            })
        };

        console.log("check nbnnnn")

        const hashedPasswword = md5(password);
        console.log("hashedPasswword", hashedPasswword);
        const newUser = await new User({
            ...req.body,
            password: hashedPasswword,
        });

        const savedUser = await newUser.save();
        console.log("savedUser", savedUser);
        const {password: userPassword, ...others} = savedUser._doc;

        console.log("checkkkkkkk")
        const token = jwt.sign(
            {
                email: savedUser.email,
                userId: savedUser._id,
                isAdmin: savedUser.isAdmin,
            },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
        );

        res.status(200).json({
            userInfo: others,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

const signIn = async (req, res) => {
    console.log("sign innnnn")
    const {email, password: enteredPassword} = req.body;

    try {
        const existingUser = await User.findOne({email});
        console.log("existingUser", existingUser)

        if(!existingUser) return res.status(404).json({
            message: 'User does not exist',
        })

        const isPasswordCorrect = md5(enteredPassword) === existingUser._doc.password;
        if(!isPasswordCorrect) return res.status(404).json({message: 'Password is incorrect'});

        const {password, ...others} = existingUser._doc;

        const token = jwt.sign(
            {
                email: existingUser.email,
                userId: existingUser._id,
                isAdmin: existingUser.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            userInfo: others,
            token: token,
        })


    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }

}


module.exports = {
    signUp,
    signIn
}