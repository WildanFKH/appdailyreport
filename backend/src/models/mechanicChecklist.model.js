const mongoose = require("mongoose");

const mechanicChecklistSchema = new mongoose.Schema(
  {
    serviceReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceReport",
      required: true,
    },
    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    usedSpareparts: [
      {
        sparepart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sparepart",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MechanicChecklist", mechanicChecklistSchema);
