const express = require('express');
const router = express.Router();
const Booking = require('../models/booking')
const mongoose = require("mongoose");

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

router.post('/book', (req,res,next)=>{
  const name = req.body.name
  const date = req.body.date
  const description = req.body.description
  const location = req.body.location
  const id = req.body.spaceId
  console.log(date)
  res.render('confirm',{name,date,description,location,id})
})

router.post('/book/confirm', (req,res,next)=>{
    Booking.create({
      space: mongoose.Types.ObjectId(req.body.spaceId),
      tenant: mongoose.Types.ObjectId(req.session.currentUser._id),
      bookingPeriod: req.body.date
    })
    .then((Booking)=>{
      console.log('booking saved')
      res.redirect('/')
    })
})


module.exports = router