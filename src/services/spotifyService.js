const axios = require("axios");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const authOptions = {
  method: 'post',
  url: 'https://accounts.spotify.com/api/token',
  data: new URLSearchParams({ grant_type: 'client_credentials' }),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
  }
};

exports.spotifyToken = async () => {
  try {
    const response = await axios(authOptions);
    return response.data.access_token;
  }
  catch (error) {
    console.error("Error fetching Spotify token:", error.response.data);
    throw error;
  }
};

exports.example = async () => {
  return { message: "Service for spotify" };
};
