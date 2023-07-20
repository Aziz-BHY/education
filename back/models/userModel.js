const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    role: {
      type: String,
      enum: ["admin", "student", "teacher", "parent"],
      default: "user",
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);