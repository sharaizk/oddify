const mongoose = require("mongoose");
const { sign } = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "email not found"],
  },
  otp: {
    type: Number,
    default: null,
  },
  telegram_code: {
    type: Number,
    default: null,
  },
  telegram_status: {
    type: Number,
    default: null,
  },
  telegram_username: {
    type: String,
    default: "",
  },
  telegram_chat_id: {
    type: String,
    default: "",
  },
});

userSchema.methods.getJwtToken = function () {
  return sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

module.exports = mongoose.model("users", userSchema);
