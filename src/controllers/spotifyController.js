
const spotifyService = require("../services/spotifyService");

exports.example = async (req, res, next) => {
  try {
    const data = await spotifyService.example();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
