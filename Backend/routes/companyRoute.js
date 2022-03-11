const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Company = require("../models/Company");

//image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "images");
    cb(null, "images/company");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file formate"), false);
  }
};

//image upload using multer
const upload = multer({
  storage: storage,
  fileFilter: filefilter,
  limits: 100000000,
});

//add new Company
router.post("/new", upload.single("icon"), async (req, res) => {
  const companyData = new Company({
    companyName: req.body.companyName,
    founder: req.body.founder,
    sector: req.body.sector,
    icon: req.file,
  });

  companyData.save().catch((e) => {
    console.log(e);
  });
  res.status(201).json({
    message: "Company Added Successfully ",
    addCompany: companyData,
  });
});

//get all company
router.get("/all", async (req, res) => {
  try {
    const allCompany = await Company.find({});
    res.status(200).send(allCompany);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get company by id
router.get("/companyInfo/:id", async (req, res) => {
  const companyId = req.params.id;
  try {
    const companyData = await Company.find({ _id: companyId });
    res.status(200).send(companyData);
  } catch (error) {
    res.status(400).send(error);
  }
});

//edit company info
router.patch("/editCompany/:id", upload.single("icon"), async (req, res) => {
  try {
    const compnayData = await Company.findByIdAndUpdate(
      req.params.id,
      {
        companyName: req.body.companyName,
        founder: req.body.founder,
        sector: req.body.sector,
        icon: req.file,
      },
      { new: true, runValidators: true }
    );
    res.send(compnayData);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete company
router.delete("/delete/:id", async (req, res) => {
  try {
    const companyData = await Company.findOneAndDelete({
      _id: req.params.id,
    });
    res.send(companyData);
  } catch (e) {
    res.status(500).send();
  }
});
//get company sector wise
router.get("/getSectorwise/:sector", async (req, res) => {
  const companySector = req.params.sector;
  try {
    const companyData = await Company.find({ sector: companySector });
    res.status(200).send(companyData);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
