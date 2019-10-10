const express = require('express');
const router = express.Router();
const Booking = require('../models/booking')
const mongoose = require("mongoose");
const Space = require("../models/space")

// router.get('/book/:spaceId', (req,res,next)=>{
//   console.log(req.body.date)
//   Space.findById(req.params.spaceId)
//     .then((space)=> {
//       console.log(space)
//     res.render('confirm', {space})
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   })

router.post('/book', (req, res, next) => {

  if (!req.session.currentUser) {
    req.session.redirectUrl = `/spaces/${req.body.spaceId}`
    res.redirect("auth/login");
    return;
  }
  const name = req.body.name
  const date = req.body.date
  const location = req.body.location
  const id = req.body.spaceId
  const image = req.body.image
  const address = req.body.address
  console.log(date)
  res.render('confirm', { name, date, location, id, image, address })
})

router.post('/book/confirm', (req, res, next) => {
  Booking.create({
    space: mongoose.Types.ObjectId(req.body.spaceId),
    tenant: mongoose.Types.ObjectId(req.session.currentUser._id),
    bookingPeriod: req.body.date
  })
    .then((Booking) => {
      console.log('booking saved')
      res.redirect('/spaces')
    })
    .catch((err) => {
      res.send(err)
    })
})


module.exports = router