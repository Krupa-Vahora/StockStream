const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const News = require("../models/News");

//image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/news");
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

//add news
router.post(
  "/addNews/:company_id",
  upload.single("image"),
  async (req, res) => {
    const companyData = req.params.company_id;
    const newsData = new News({
      title: req.body.title,
      content: req.body.content,
      image: req.file,
      company: companyData,
    });

    newsData.save().catch((e) => {
      console.log(e);
    });
    res.status(201).json({
      message: "News Added Successfully ",
      addNews: newsData,
    });
  }
);

//get all news
router.get("/allNews", async (req, res) => {
  try {
    const allNews = await News.find({});
    res.status(200).send(allNews);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete news
router.delete("/deleteNews/:id", async (req, res) => {
  try {
    const newsData = await News.findOneAndDelete({
      _id: req.params.id,
    });
    res.send(newsData);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
