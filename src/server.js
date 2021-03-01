const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialization

const app = express();

app.use(cors());
app.use(bodyParser.json({ strict: false, limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Version 1

app.use("/api/v1", require("./routes"));

// Errors

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;