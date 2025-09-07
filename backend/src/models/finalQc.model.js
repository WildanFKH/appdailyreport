const mongoose = require("mongoose");

const finalQcSchema = new mongoose.Schema(
  {
    serviceReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceReport",
      required: true,
    },
    checkedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
    },
    usedSpareparts: [
      {
        sparepart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sparepart",
        },
        quantity: {
          type: Number,
          required: true,
        },
        cost: Number,
        priceWT: Number,
      },
    ],
    serviceFee: {
      type: Number,
      required: true,
    },
    totalEstimate: {
      type: Number,
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FinalQc", finalQcSchema);
