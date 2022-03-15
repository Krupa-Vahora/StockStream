const mongoose = require("mongoose");

const Stock = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
  },
  {
    timestamps: true,
  }
);

const stockData = mongoose.model("stock", Stock);
module.exports = stockData;
