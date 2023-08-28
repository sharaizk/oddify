const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    eventId: {
      type: Number,
      required: [true, "Please, provide competition id"],
    },
    eventTitle: {
      type: String,
      required: [true, "Please, provide event title"],
    },
    league: {
      type: String,
      required: [true, "Please, provide event league"],
    },
    countryCode: {
      type: String,
    },
    openDate: {
      type: Date,
      required: [true, "Please, provide open date"],
    },
    totalMatched: {
      type: Number,
      default: 0,
    },
    currentTotalMatched: {
      type: Number,
      default: 0,
    },
    inPlay: {
      type: Boolean,
      required: [true, "Please, provide in play"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("events", eventSchema);
