const mongoose = require("mongoose");

const serviceReportSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    product: {
      brand: { type: String, required: true },
      collection: { type: String, required: true },
      size: { type: String, required: true },
      color: { type: String, required: true },
    },
    serviceRequest: {
      type: String,
      enum: ["Repair", "Replace"],
      required: true,
    },
    spareparts: [
      {
        name: { type: String, required: true },
        customItem: { type: String, default: "" },
        quantity: { type: Number, default: 0 },
      },
    ],
    conditionNotes: { type: String, required: true },
    warranty: {
      isUnderWarranty: { type: Boolean, required: true },
      purchaseDate: { type: Date },
    },
    finishEstimate: { type: Date, required: true },
    status: {
      type: String,
      enum: [
        "Pending QC",
        "Assign Mechanic",
        "Rejected",
        "Repaired",
        "Ready for Check",
        "Audit Approved",
        "Completed",
      ],
      default: "Pending QC",
    },
    created_by: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    finalQc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FinalQc",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceReport", serviceReportSchema);
