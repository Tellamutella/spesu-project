const mongoose = require("mongoose");

const Space = mongoose.model("space", {
  owner: {
    mongoose.Types.ObjectId,
    ref: "user"
  },
  bookings: {
    mongoose.Types.ObjectId,
    ref: "booking"
  }
});

module.exports = Space;