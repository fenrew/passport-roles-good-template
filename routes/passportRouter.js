const express = require("express");
const router = express.Router();

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get("/login", (req, res, next) => {
  res.render("passport/login", { message: req.flash("error") });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/formal-page",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.use(ensureLogin.ensureLoggedIn());

router.get("/signup", (req, res, next) => {
  if (req.user.role !== "boss") {
    res.send("Fuck off!");
  }
  res.render("passport/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, password, role } = req.body;
  // const username = req.body.username;
  // const password = req.body.password;
  // const role = req.body.role;

  if (username === "" || password === "") {
    res.render("passport/signup", {
      message: "Indicate username and password"
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("passport/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      password: hashPass,
      role
    });

    newUser.save(err => {
      if (err) {
        res.render("passport/signup", {
          message: "Please write ta or developer"
        });
      } else {
        res.redirect("/signup");
      }
    });
  });
});

router.get("/private-page", (req, res) => {
  if (req.user.role !== "boss") {
    res.send("Fuck off, Dalina!");
  }
  User.find({}).then(user => {
    res.render("passport/private", { user });
  });
});

router.get("/private-page/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/private-page");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
