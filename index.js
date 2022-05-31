require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');
// const projectRouter = require('./routes/project');


const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //connect successfully
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("error", error.message);
    })


//routes
app.use('/users', userRouter);
app.use('/uploads', uploadRouter);
// app.use('/projects', projectRouter);


