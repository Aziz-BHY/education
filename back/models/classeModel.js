const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    cours: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cours"
    }],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Classe", classeSchema);