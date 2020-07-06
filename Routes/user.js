const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body } = require("express-validator");
const { signin, signup,dashboard} = require("../Controllers/user");
const requireLogin = require("../Authentication/requireLogin");

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

router.get("/getUser",requireLogin,dashboard);

module.exports = router;
