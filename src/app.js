const express = require("express");
const logger = require("morgan");
const path = require("path");

const spotifyRouter = require("./routes/spotify");

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/spotify", spotifyRouter);


// Catch 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
