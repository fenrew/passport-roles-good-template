const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/formal-page", (req, res, next) => {
  res.render("passport/formal-page");
});

router.get("/list-profiles", (req, res, next) => {
  User.find({}).then(user => {
    res.render("passport/profileList", { user });
  });
});

router.get("/edit", (req, res, next) => {
  currentUserRole = req.user;
  res.render("passport/edit", { currentUserRole });
});

router.post("/update", (req, res, next) => {
  const { username, password, role } = req.body;
  const userId = req.user._id;
  const hashPass = bcrypt.hashSync(password, 10);
  User.findByIdAndUpdate(userId, { username, password: hashPass, role }).then(
    user => {
      res.redirect("/formal-page");
    }
  );
});
module.exports = router;
