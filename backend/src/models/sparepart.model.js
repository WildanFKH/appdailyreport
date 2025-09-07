const mongoose = require("mongoose");

const sparepartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    colour: {
      type: String,
    },
    cost: {
      type: Number,
      required: true,
    },
    priceWT: {
      // With Tax
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sparepart", sparepartSchema);
