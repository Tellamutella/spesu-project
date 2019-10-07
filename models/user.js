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
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
