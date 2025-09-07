const mongoose = require("mongoose");

const sparepartRequestSchema = new mongoose.Schema(
  {
    sparepart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sparepart",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: { type: Number, required: true },
    note: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SparepartRequest", sparepartRequestSchema);
