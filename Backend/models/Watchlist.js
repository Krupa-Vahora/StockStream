const mongoose = require("mongoose");
const Watchlist = mongoose.Schema({
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
});

const watchlistData = mongoose.model("Watchlist", Watchlist);
module.exports = watchlistData;
