const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userModel = require("../module/userSchema");
require("dotenv").config();

const refreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies.refresh;

  if (!cookie) {
    res.status(400);
    throw new Error("invalid cookie");
  }

  const token = cookie;

  const checkTokenInDB = await userModel.findOne({ token });

  if (!checkTokenInDB) {
    res.status(400);
    throw new Error("Invalid cookie in db");
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) res.sendStatus(403);
    const accessToken = jwt.sign({ pyLoad: decoded.pyLoad }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    res.cookie("access", accessToken, { httpOnly: true, maxAge: 60 * 1000 });
    res.status(200).json("successful refresh access token");
  });
});

module.exports = refreshToken;
