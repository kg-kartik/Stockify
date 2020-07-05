// THIS IS USED AS A MIDDLEWARE
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // GET A TOKEN FROM THE HEADER
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).json({
      err: "No token, Access Denied",
    });
  }
  // VERFYING THE TOKEN
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
};
