const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "Please, provide event league"],
    },
    market: {
        type: Number,
        required: [true, "Please, provide competition id"],
      },
      chat_id: {
        type: Number,
        required: [true, "Please, provide competition id"],
      },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("user_notifications", notificationsSchema);
