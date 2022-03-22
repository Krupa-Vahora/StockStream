const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
// const User = require("../models/User");

// router.post("/new/:id", async (req, res) => {
router.post("/new", async (req, res) => {
  // const userId = req.params.id;

  const portData = new Portfolio({
    ...req.body,
    // User: userId,
  });
  portData.save().catch((error) => {
    console.log(error);
  });
  res.status(201).json({
    message: "New Stock Added in Portfolio",
    addPort: portData,
  });
});

// router.get("/allPortStock/:id", async (req, res) => {
router.get("/allPortStock", async (req, res) => {
  try {
    // const userId = req.params.id;
    // const portData = await Portfolio.find({ User: userId });
    const portData = await Portfolio.find({});
    res.status(200).send(portData);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const portData = await Portfolio.findByIdAndDelete({
      _id: req.params.id,
    });
    res.send(portData);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
