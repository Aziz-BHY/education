const mongoose = require("mongoose");

const chapitreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "titleis required"],
    },
    content: [
        {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              required: [true, "must specify id"]
            },
            type:{
              type: String,
              enum: ['Exercice', 'Cours', 'Animation'],
              required: [true, "must specify type"]
            },
            files: [],
            description: {
                type: String,
                required: [true, "Description is required"],
            }
        }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chapitre", chapitreSchema);