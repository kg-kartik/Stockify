var User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const user = new User(req.body);
  // HASHING THE PASSWORD
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  // USING HASHED PASSWORD FOR DATABASE
  user.password = hash;

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save the user",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      password: hash,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        err: "USER does not exist",
      });
    }
    // IF WE FOUND A USER IN THE DATABASE THEN CREATE A TOKEN AND RETURN IT
    jwt.sign(
      {
        data: "foobar",
      },
      "secret",
      { expiresIn: 60 * 60 },
      function (err, token) {
        if (err) {
          console.log("Token Error", err);
        }
        return res.json({ token, user });
      }
    );
  });
};

// CUSTOM MIDDLEWARE
exports.isAdmin = (req, res, next) => {
  if (req.params.role == 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};
