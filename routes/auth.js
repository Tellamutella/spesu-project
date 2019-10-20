const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
var multer = require("multer");
const uploadCloud = require("../config/cloudinary.js");
var Space = require("../models/space");
var Booking = require("../models/booking");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", uploadCloud.single("userImage"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const image = req.file.url;
  const bcryptSalt = 10;
  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.send("Username alaready taken");
      } else {
        bcrypt.hash(req.body.password, bcryptSalt, function(err, hash) {
          if (err) {
            res.send(err.message);
          } else {
            User.create({
              username: username,
              password: hash,
              firstname: firstname,
              lastname: lastname,
              image: image
            })
              .then(user => {
                console.log("user saved!");
                res.render("auth/login");
              })
              .catch(err => {
                res.send(err);
              });
          }
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        console.log("username or password incorrect!");
        res.render("auth/login", {
          errorMessage: "username or password incorrect!"
        });
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, equal) {
          if (err) {
            console.log(err);
          } else if (!equal) {
            res.render("auth/login", {
              errorMessage: "username or password incorrect!"
            });
          } else {
            req.session.currentUser = user;
            console.log("you logged in!");
            if (req.session.redirectUrl) {
              res.redirect(req.session.redirectUrl);
            } else {
              res.redirect("/spaces");
            }
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// router.get('/profile', (req,res)=>{
//     res.render('profile')
// });

module.exports = router;
