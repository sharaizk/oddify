const mongoose = require("mongoose");

const filterSchema = mongoose.Schema(
  {
    userId: {
      ref: "users",
      type: mongoose.Types.ObjectId,
    },
    leagueSettings: {
      type: Object,

      highlightStartOdds: {
        type: Boolean,
        default: false,
        enum: [true, false],
      },
      bothTeamsToScore: {
        type: Array,
        default: [],
        enum: ["yes", "no"],
      },

      halfTimeMatchOdds: {
        type: Array,
        default: [],
        enum: ["1", "x", "2"],
      },

      overUnder: {
        type: Array,
        default: [],
        enum: ["over", "under"],
      },

      selectedCompetitions: {
        type: Array,
        default: [],
      },
    },

    betSettings: {
      type: Object,
      enableNotifications: {
        type: Boolean,
        default: false,
      },
      moneyRaise: {
        type: Number,
      },
      raisePercent: {
        type: Number,
      },
      marketMoney: {
        type: Number,
      },
      minimumOdds: {
        type: Number,
      },
      maximumOdds: {
        type: Number,
      },
      maximumPastOdds: {
        type: Number,
      },
      startOdds: {
        type: Number,
      },
      firstOddsChangePercent: {
        type: Number,
      },

      gameStatus: {
        type: String,
        enum: ["all", "live", "prematch"],
      },

      oddsDirections: {
        type: String,
        enum: ["raise", "drop"],
      },
      selectedMarkets: {
        type: Array,
        default: [],
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

filterSchema.virtual("competitions", {
  ref: "competitions",
  localField: "leagueSettings.selectedCompetitions",
  foreignField: "competitionId",
});

module.exports = mongoose.model("filters", filterSchema);
