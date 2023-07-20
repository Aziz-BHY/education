const mongoose = require("mongoose");
const chapitreModel = require("./chapitreModel");

const coursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "teacher is required"],
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],        
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    chapitres:{
        type: [chapitreModel],
        default: []
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cours", coursSchema);