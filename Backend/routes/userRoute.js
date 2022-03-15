const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

//register
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();

  try {
    await user.save();
    res
      .status(201)
      .send({ user, token, message: "You are Succesfully register" });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: req.body.email,
  });
  console.log(user);
  res.send({ message: "login", user });
});

//allUser
router.get("/allUser", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.send("Error:" + error);
  }
});

//logout
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "You are logged out" });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
