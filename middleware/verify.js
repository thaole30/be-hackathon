const express = require('express');
const jwt = require ('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];
        console.log("token in BE", token);

        let decodedData;

        if(token) {

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedInfo) => {
                if (err) {
                    console.error(err);
                    return res.status(403).json("Token is not valid!")
                };

                // console.log("decodedData", decodedInfo);
                decodedData = decodedInfo;
                req.decodedData = decodedData;
            })
        } else {
            //doesnt have token
            return res.status(401).json("You are not authenticated!");
        }

        next();
    } else {
        //k co header
        return res.status(401).json("You are not authenticated!");
    }
}


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.decodedData.userId === req.params.id || req.decodedData.userId || req.decodedData.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that")
        }
    })
}


const verifyTokenAndAdmin = (req, res, next) => {
    console.log("check admin or not");
    verifyToken(req, res, () => {
        if (req.decodedData.isAdmin) {
            console.log("im admin");
            next();
        } else {
            res.status(403).json("You are not allowed to do that")
        }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}