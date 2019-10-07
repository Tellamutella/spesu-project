const mongoose = require("mongoose");

const Booking = mongoose.model("booking", {
  space: String,
  tenant: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  period: {
    startDate: Date,
    endDate: Date
  }
});

module.exports = Booking;