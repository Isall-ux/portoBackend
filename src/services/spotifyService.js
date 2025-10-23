const axios = require("axios");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Config for Spotify authentication request
const auth = {
  method: 'post',
  url: 'https://accounts.spotify.com/api/token',
  data: new URLSearchParams({ grant_type: 'client_credentials' }),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  }
};

// Function to fetch Spotify access token
const accessToken = async () => {
  try {
    const response = await axios(auth);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch Spotify user profile
const profile = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Spotify profile:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { accessToken, profile };
