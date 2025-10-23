const { accessToken, profile } = require('../services/spotifyService');

exports.getProfile = async (req, res) => {
  try {
    const token = await accessToken();
    const user = await profile(token);
    res.json(user);
  } catch (error) {
  if (error.response?.status === 401) {
    console.error("Spotify token not authorized for this endpoint. Are you using client_credentials instead of user token?");
  } else {
    console.error("Error fetching Spotify profile:", error.response?.data || error.message);
  }
  throw error;
}};
