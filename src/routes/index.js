const express = require("express");
const router = express.Router();

/* GET home page (API root). */
router.get("/", (req, res) => {
  res.json({ message: "express" });
});

module.exports = router;
