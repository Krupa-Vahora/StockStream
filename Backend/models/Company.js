const mongoose = require("mongoose");
const company = new mongoose.Schema({
  // company schema
  companyName: {
    type: String,
    required: true,
  },
  founder: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
});

const companyCollection = mongoose.model("company", company);
module.exports = companyCollection;
