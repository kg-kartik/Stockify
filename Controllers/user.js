const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

exports.signup = (req, res) => {
  // EXPRESS-VALIDATOR ERRORS CHECKING
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const user = new User(req.body);
  // HASHING THE PASSWORD
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  // USING HASHED PASSWORD FOR DATABASE
  user.password = hash;

  user.save((err, user) => {
    if (err) {
      console.log(err);
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
  // EXPRESS-VALIDATOR ERRORS CHECKING
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  //Checking if the user has registered or not
  User.findOne({
    email,
  }).then((user) => {
    if (!user) {
      return res.status(422).json({
        error: "User with this email is not present",
      });
    }

    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          //If password matches then issue a token depending upon the payload given
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.SECRET
          );

          const { _id, email, password } = user;
          res.json({
            token,
            user: { _id, email, password },
          });
        } else {
          res.json({
            error: "Sorry Incorrect Email/Password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.dashboard = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.signout = (req, res) => {};
