const mongoose = require("mongoose");
const News = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    image: {
      type: Object,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
  },
  {
    timestamp: true,
  }
);

const newsData = mongoose.model("News", News);
module.exports = newsData;
