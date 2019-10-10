var express = require("express");
var router = express.Router();
var User = require("../models/user");
var mongoose = require("mongoose");
var Booking = require("../models/booking")
var Space = require("../models/space")

router.get("/user", (req, res) => {
  if (req.session.currentUser) {
    Booking.find({ tenant: req.session.currentUser._id })
      .populate("space")
      .then((booking) => {
        Space.find({ owner: req.session.currentUser._id })
          .then((space) => {
            res.render('user-profile', { user: req.session.currentUser, booked: booking, space: space })
          })
      })
      .catch((err) => {
        res.send(err)
      })
  } else {
    res.render('auth/login')
  }
});

module.exports = router;

