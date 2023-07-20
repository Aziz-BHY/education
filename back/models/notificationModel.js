const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notif", notifSchema);