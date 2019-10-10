var mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    firstname: {
      type: String,
      require: true
    },
    lastname: {
      type: String,
      require: true
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);

module.exports = User;
