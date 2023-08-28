const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { RandomOTPGenerator } = require("../helpers/functions");
exports.userLogin = async (req, res) => {
  try {
    const { email, step, otp } = req.body;
    if (step === 1) {
      if (!email) {
        return res.status(403).json({ error: "Please! enter your email" });
      }
      const otpNumber = RandomOTPGenerator();
      const existedUser = await User.findOneAndUpdate(
        { email: email },
        { otp: otpNumber }
      );

      if (!existedUser) {
        const newUser = new User({
          email,
          otp: otpNumber,
          telegram_code: Math.round(Math.random() * 1000000000),
        });

        const registerUser = await newUser.save();
      }
      return res.status(200).json({
        step: 2,
        otpTitle: `OTP sent - ${otpNumber}`,
        otpDescription: "We have sent an OTP to your email address",
      });
    } else if (step === 2) {
      if (!otp || !email) {
        return res.status(403).json({ error: "Please! enter a valid OTP" });
      }

      const authenticatedUser = await User.findOneAndUpdate(
        {
          email: email,
          otp: otp,
        },
        { otp: null },
        { new: true }
      ).select("email name username");

      if (!authenticatedUser) {
        return res.status(404).json({ error: "Please! enter a valid OTP" });
      }

      return res.status(200).json({
        message: "User logged in Successfully",
        token: authenticatedUser.getJwtToken(),
        user: authenticatedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loadUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const userExists = await User.findOne({ _id: id }).select(
      "email name username"
    );
    if (userExists) {
      return res.status(200).send({ data: userExists });
    } else {
      return res.status(404).send({ error: "User Not Found" });
    }
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
};
