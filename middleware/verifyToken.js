const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access;

  if (!token) {
    res.status(400);
    throw new Error("Authorization");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(400);
      throw new Error("User not fund");
    }
    req.user = decoded.pyLoad;
  });
  next();
};

module.exports = verifyToken;
