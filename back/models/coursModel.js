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
    chapitres:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapitre"
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cours", coursSchema);