require("dotenv").config();
const express = require("express");
const {
  validateUrlMiddleware,
} = require("./middlewares/validators/urlValidator");
const { handleErrorMiddleware } = require("./middlewares/errors/errorHandler");
const dbUtils = require("./utils/dbUtils/dbCrud");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

app.post("/short-url", validateUrlMiddleware, async (req, res) => {
  const { url } = req.body;
  const content = {
    shortned_url: "http://localhost:3000/1234",
    original_url: url,
    user_id: 1
  }
  const { insertId: id } = await dbUtils.create('urls', content)
  res.status(200).json({
    id,
    shortned_url: "http://localhost:3000/1234",
    original_url: url,
  });
});

app.use(handleErrorMiddleware);

module.exports = app;
