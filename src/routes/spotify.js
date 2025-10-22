
const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");

router.get("/", spotifyController.spotifyToken);

module.exports = router;
