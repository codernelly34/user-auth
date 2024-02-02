const verifyInput = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fill are mandatory");
  }
  next();
};

module.exports = verifyInput;
