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
    address:{
      type:String
    },
    long:{
      type:Number
    },
    lat:{
      type:Number
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
const Space = mongoose.model("space", spaceSchema);

module.exports = Space;