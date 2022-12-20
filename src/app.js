const express = require("express");
const {
  validateUrlMiddleware,
} = require("./middlewares/validators/urlValidator");
const { handleErrorMiddleware } = require("./middlewares/errors/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

app.post("/short-url", validateUrlMiddleware, (req, res) => {
  const { url } = req.body;
  res.status(200).json({
    id: 1,
    shortned_url: "http://localhost:3000/1234",
    original_url: url,
  });
});

app.use(handleErrorMiddleware)

module.exports = app;
