const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/admin", auth("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/user", auth("user"), (req, res) => {
  res.json({ message: "Welcome User!" });
});

router.get("/guest", auth("guest"), (req, res) => {
  res.json({ message: "Welcome Guest!" });
});

module.exports = router;
