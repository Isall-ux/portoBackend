
const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");

router.get("/", spotifyController.getProfile);

module.exports = router;
