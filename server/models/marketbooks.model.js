const mongoose = require("mongoose");

const marketBookSchema = mongoose.Schema(
  {
    bookId: {
      type: Number,
      required: [true, "Please, provide marketbook id"],
    },
    marketName: {
      type: String,
      required: [true, "Please, provide market name"],
    },
    eventId: {
      type: Number,
      required: [true, "Please, provide event id"],
    },
    competitionId: {
      type: Number,
      required: [true, "Please, provide competition id"],
    },
    totalMatched: {
      type: Number,
      required: [true, "Please, provide total matched"],
    },
    marketStartTime: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

marketBookSchema.virtual("event", {
  ref: "events",
  localField: "eventId",
  foreignField: "eventId",
  justOne: true,
});

module.exports = mongoose.model("marketbooks", marketBookSchema);
