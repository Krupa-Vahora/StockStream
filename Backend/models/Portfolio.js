const mongoose = require("mongoose");

const Portfolio = mongoose.Schema({
  companyName: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  percentage: {
    type: String,
    require: true,
  },
  // User: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
});

const portfolioData = mongoose.model("Portfolio", Portfolio);
module.exports = portfolioData;
