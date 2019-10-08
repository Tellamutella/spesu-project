const mongoose = require("mongoose");
const Schema = mongoose.Schema

const spaceSchema = new Schema(
  {
    name: {
      type: String
      // require: true
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user"
      // require: true
    },
    // bookings: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "booking"
    //   // require: true
    // },
    location: {
      type: String
      // require: true
    },
    // availability: {
    //   startDate: {
    //     type: Date
    //     // require: true
    //   },
    //   endDate: {
    //     type: Date
    //     // require: true
    //   }
    // },
    description: {
      type: String
      // require: true,
    },
    image: {
      type: String
    }
  }
)
const Space = mongoose.model("Space", spaceSchema);

module.exports = Space;