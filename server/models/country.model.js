const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
  countryCode: {
    type: String,
    required: [true, "Please provide a country code"],
  },
  countryName: {
    type: String,
    required: [true, "Please provide country Name"],
  },
});

module.exports = mongoose.model("countries", countrySchema);
