const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModel = require("../module/userSchema");
const jwt = require("jsonwebtoken");

const sinUp = asyncHandler(async (req, res) => {
  const user = req.body;

  const check1 = await userModel.findOne({ username: user.username });

  if (check1) {
    if (check1.username === user.username || check1.email === user.email) {
      res.status(400);
      throw new Error("Unable to create user the username an email are already in use ");
    }
  }

  const pwd = await bcrypt.hash(user.password, 13);

  if (!pwd) {
    res.status(500);
    throw new Error("Unable to create user this is a Server error");
  }

  user.password = pwd;

  const createUser = await userModel.create(user);
  res.status(201).json(createUser);
});

//
const logIn = asyncHandler(async (req, res) => {
  const user = req.body;

  const check1 = await userModel.findOne({ username: user.username });

  if (!check1 || check1.email != user.email) {
    res.status(400);
    throw new Error("invalid user name an email");
  }

  const pwd = await bcrypt.compare(user.password, check1.password);

  if (!pwd) {
    res.status(500);
    throw new Error("invalid password");
  }

  const pyLoad = {
    username: user.username,
    email: user.email,
  };

  const accessToken = jwt.sign({ pyLoad }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
  const refreshToken = jwt.sign({ pyLoad }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  check1.token = refreshToken;
  check1.save();

  res.cookie("access", accessToken, { httpOnly: true, maxAge: 60 * 1000 });
  res.cookie("refresh", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.status(200).json(user);
});

const test = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "good one" });
});

module.exports = { sinUp, logIn, test };
