const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    space: {
      type: mongoose.Types.ObjectId,
      ref: "space"
      // require: true
    },
    tenant: {
      type: mongoose.Types.ObjecyId,
      ref: "user"
      // require: true
    },
    bookingPeriod:{
      startDate: {
        type: Date
      // require: true
      },
      endDate: {
        type: Date
      // require: true
      }
    }
  }
)

const Booking = mongoose.model("booking", bookingSchema)

module.exports = Booking;