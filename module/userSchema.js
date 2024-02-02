const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a usernema"],
  },
  email: {
    type: String,
    required: [true, "Please enter a useremail"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  token: {
    type: String,
    default: "6702284ddd7640f3143a257b69bb",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
