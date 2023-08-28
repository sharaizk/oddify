const mongoose = require("mongoose");

const competitionSchema = mongoose.Schema({
  competitionId: {
    type: Number,
    required: [true, "Please, provide competition id"],
  },
  title: {
    type: String,
    required: [true, "Please, provide competition title"],
  },
  region: {
    type: String,
    required: [true, "Please, provide competition region"],
  },
  marketCount: {
    type: Number,
    required: [true, "Please, provide competition market count"],
  },
});

module.exports = mongoose.model("competitions", competitionSchema);