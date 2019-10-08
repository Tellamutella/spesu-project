const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  space: {
    type: mongoose.Types.ObjectId,
    ref: "space"
    // require: true
  },
  tenant: {
    type: mongoose.Types.ObjectId,
    ref: "user"
    // require: true
  },
  bookingPeriod: {
    type: String
    // require: true
  }
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
