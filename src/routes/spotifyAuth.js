// spotifyAuth.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// --------- Step 1: Login ---------
router.get('/login', (req, res) => {
  const scopes = 'user-read-email user-read-private';
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  const authUrl = `https://accounts.spotify.com/authorize?` +
    new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scopes,
      redirect_uri: redirectUri
    }).toString();

  res.redirect(authUrl);
});

// --------- Step 2: Callback ---------
router.get('/callback', async (req, res) => {
  const code = req.query.code;
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
    ).toString('base64')
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    const { access_token, refresh_token } = response.data;

    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);

    res.send('✅ Tokens received! Check console and save them in your .env.');
  } catch (error) {
    console.error('Error fetching tokens:', error.response?.data || error.message);
    res.status(500).send('Error during OAuth callback');
  }
});

// --------- Step 3: Profile ---------
router.get('/profile', async (req, res) => {
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN; // manually save after first login

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.response?.data });
  }
});

// --------- Optional: Refresh Token Function ---------
async function refreshAccessToken() {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const data = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
  });
  const headers = {
    'Authorization': 'Basic ' + Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
    ).toString('base64')
  };

  const response = await axios.post(tokenUrl, data, { headers });
  const newToken = response.data.access_token;
  console.log("🔁 Refreshed Token:", newToken);
  return newToken;
}

module.exports = { router, refreshAccessToken };
