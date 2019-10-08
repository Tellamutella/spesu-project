var express = require("express");
var router = express.Router();
var User = require("../models/user");
var mongoose = require("mongoose");

router.get("/user", (req, res) => {
  if (req.session.currentUser) {
    res.render('user-profile', { user: req.session.currentUser })
  } else {
    res.render('auth/login')
  }
});

module.exports = router;

