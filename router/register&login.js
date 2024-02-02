const express = require("express");
const { sinUp, logIn, test } = require("../controller/register&login");
const refreshToken = require("../controller/refreshAccess");
const verifyInput = require("../middleware/verifyInput");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/sinUp").post(verifyInput, sinUp);
router.route("/logIn").post(verifyInput, logIn);
router.route("/user").get(verifyToken, test);
router.route("/refresh").get(refreshToken);

module.exports = router;
