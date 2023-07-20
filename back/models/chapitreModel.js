const mongoose = require("mongoose");

const chapitreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "titleis required"],
    },
    content: [
        {
            link: {
                type: String,
                required: [true, "link is required"],
            },
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