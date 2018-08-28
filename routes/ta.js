const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/courses", (req, res, next) => {
  res.render("passport/courses");
});

router.get("/courses/edit", (req, res, next) => {
  res.render("passport/courses-edit");
});

module.exports = router;
