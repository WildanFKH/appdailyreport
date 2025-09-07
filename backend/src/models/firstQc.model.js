const mongoose = require("mongoose");

const qcChecklistSchema = new mongoose.Schema(
  {
    serviceReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceReport",
      required: true,
      unique: true,
    },
    checked_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QCChecklist", qcChecklistSchema);
