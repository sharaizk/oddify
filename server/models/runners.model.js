const mongoose = require("mongoose");

const runnersSchema = mongoose.Schema(
  {
    eventId: {
      type: Number,
      ref: "events",
      required: [true, "What is the event id"],
    },
    runnerName: {
      type: String,
      default: "",
    },
    marketId: {
      type: Number,
      ref: "marketbooks",
      required: [true, "What is the market id"],
    },
    selectionId: {
      type: Number,
      required: [true, "What is the selection id"],
    },
    type: {
      type: String,
      required: [true, "What is the type"],
    },
    marketStatus: {
      type: String,
      required: [true, "Please, provide market status"],
    },
    marketStartTime: {
      type: Date,
      // default: null,
    },
    totalMatched: {
      type: Number,
      required: [true, "Please, provide total matched"],
    },
    previousTotalMatched: {
      type: Number,
      required: [true, "Please, provide total matched"],
    },

    lastMatchTime: {
      type: Date,
      default: null,
    },
    score: {
      type: String,
      default: null,
    },
    odds: {
      type: String,
      default: null,
    },
    totalAvailable: {
      type: Number,
      required: [true, "Please, provide total available"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("marketrunners", runnersSchema);
