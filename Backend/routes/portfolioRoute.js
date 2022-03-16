const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

router.post("/new", async (req, res) => {
  const portData = new Portfolio({
    ...req.body,
  });
  portData.save().catch((error) => {
    console.log(error);
  });
  res.status(201).json({
    message: "New Stock Added in Portfolio",
    addPort: portData,
  });
});

router.get("/allPortStock", async (req, res) => {
  try {
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
