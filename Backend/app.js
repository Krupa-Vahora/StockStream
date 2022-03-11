const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const url = "mongodb://localhost/StockStream";
const app = express();
app.use(express.static(path.join(__dirname, "/images")));
mongoose.connect(url, { useNewUrlParser: true });

const companyRoute = require("./routes/companyRoute");
const stockRoute = require("./routes/stockRoute");
const newsRoute = require("./routes/newsRoute");

const con = mongoose.connection;
con.on("open", () => {
  console.log("Connect to the StockStream DB");
});

app.use(express.json());

//route
app.use("/company", companyRoute);
app.use("/stock", stockRoute);
app.use("/news", newsRoute);

app.listen(3000, () => {
  console.log("Server Started");
});
