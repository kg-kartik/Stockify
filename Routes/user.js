var express = require("express");
var router = express.Router();
var User = require("../Models/User");
var router = express.Router();
const { check } = require("express-validator");
const { signin, signup } = require("../Controllers/user");

// SIGNUP ROUTE
router.post("/signup", signup);

// SIGNIN ROUTE
router.post("/signin", signin);

module.exports = router;
