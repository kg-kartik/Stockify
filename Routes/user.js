var express = require("express");
var router = express.Router();
var User = require("../Models/User");
var router = express.Router();
const { body } = require("express-validator");
const { signin, signup } = require("../Controllers/user");

// SIGNUP ROUTE
router.post(
  "/signup",
  [
    body("name", "Please provide a valid name").not().isEmpty(),
    body("email", "Please provide a valid email address").isEmail(),
    body(
      "password",
      "Please provide a password altleast 6 characters long"
    ).isLength({ min: 6 }),
  ],
  signup
);

// SIGNIN ROUTE
router.post(
  "/signin",
  [
    body("email", "Please provide a valid email address").isEmail(),
    body("password", "Please provide a password").not().isEmpty(),
  ],
  signin
);

module.exports = router;
