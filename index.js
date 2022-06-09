require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const projectRouter = require("./routes/project");
const hackathonRouter = require("./routes/hackathon");
const handleError = require("./middleware/handleError");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { default: axios } = require("axios");
const redisClient = require("redis").createClient();
// const newRedisClients = redisClient;



const googleClientID =
  "39336608773-ttq6cf0bsq3ns1g1acsb3nq6a4cu50ac.apps.googleusercontent.com";
const googleClientSecret = "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";

const clientId = "5c21e5da9709a3c28cb9";
const clientSecret = "fd43c238252791f0c77328bf95e1b21bd08e7a59";


const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      // console.log(accessToken);
      cb(null, { accessToken, profile });
    }
  )
);

const PORT = process.env.PORT || 7000;

const main = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      //connect successfully
      app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log("error", error.message);
    });

  await redisClient.connect();

}

main();

//routes
// -----------------------GITHUB---------------------
app.get("/auth/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
});
app.get("/oauth-callback", (req, res) => {
  // console.log(req.query.code);
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code,
  };
  const opts = { headers: { accept: "application/json" } };
  axios
    .post(`https://github.com/login/oauth/access_token`, body, opts)
    .then((res) => {
      console.log(res);
      return res.data.access_token;
    })
    .then((_token) => {
      console.log("My token:", _token);
      axios
        .get(`https://api.github.com/user/repos`, {
          headers: { Authorization: `token ${_token}` },
        })
        .then((resp) => res.json(resp.data))
        .catch((err) => res.status(401).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

// ------------------GOOGLE--------------------

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
const setCookie = (req, res, next) => {
  res.cookie("token", " req.user.auth.token", {
    httpOnly: true,
    sameSite: "strict",
    path: "https://crowhack-project.web.app/",
    secure: process.env.NODE_ENV !== "development",
  });
  next();
};
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  setCookie,
  (req, res) => {
    console.log(req.user.profile);
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("token", "my tokennnn");
    res.redirect("https://crowhack-project.web.app/");
  }
);


// -----------REDIS-----------
const DEFAULT_EX = 3600;
async function demoRedis() {
  app.get("/redis-projects", async (req, res) => {
    const cacheData = await redisClient.get("projects");
    if (cacheData != null) {
      console.log("cache", cacheData);
      return res.send(JSON.parse(cacheData));
    }
    const { data } = await axios.get("http://localhost:7000/projects");
    redisClient.setEx("projects", DEFAULT_EX, JSON.stringify(data));
    res.send(data);
  });
}
demoRedis();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use("/users", userRouter);
app.use("/uploads", uploadRouter);
app.use("/projects", projectRouter);
app.use("/hackathons", hackathonRouter);

app.use(handleError);


exports.redisClient = redisClient;