
const spotifyService = require("../services/spotifyService");

exports.spotifyToken = async (req, res, next) => {
  try {
    const data = await spotifyService.spotifyToken();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
