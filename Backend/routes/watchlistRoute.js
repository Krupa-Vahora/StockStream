const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");

router.post("/new", async (req, res) => {
  const watchData = new Watchlist({
    ...req.body,
  });
  watchData.save().catch((error) => {
    console.log(error);
  });
  res.status(201).json({
    message: "New Stock Added in Watchlist",
    addWatch: watchData,
  });
});

router.get("/allWatchStock", async (req, res) => {
  try {
    const watchData = await Watchlist.find({});
    res.status(200).send(watchData);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const watchData = await Watchlist.findByIdAndDelete({
      _id: req.params.id,
    });
    res.send(watchData);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
