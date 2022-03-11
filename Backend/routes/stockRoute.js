const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");

//add new stock
router.post("/new/:company_id", async (req, res) => {
  const companyData = req.params.company_id;
  console.log(companyData);
  const stockData = new Stock({
    ...req.body,
    company: companyData,
  });
  stockData.save().catch((error) => {
    console.log(error);
  });
  res.status(201).json({
    message: "New Stock Added",
    addStock: stockData,
  });
});

//get all stock
router.get("/allStock", async (req, res) => {
  try {
    const stockData = await Stock.find({});
    res.status(200).send(stockData);
  } catch (error) {
    res.status(400).send(error);
  }
});

//edit stock
router.patch("/stockEdit/:id", async (req, res) => {
  try {
    const stockData = await Stock.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );
    res.send(stockData);
  } catch (error) {
    res.send(error);
  }
});

//delete stock
router.delete("/deleteStock/:id", async (req, res) => {
  try {
    const stockData = await Stock.findByIdAndDelete({
      _id: req.params.id,
    });
    res.send(stockData);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
