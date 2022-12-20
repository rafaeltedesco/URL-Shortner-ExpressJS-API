require("dotenv").config();
const express = require("express");
const {
  validateUrlMiddleware,
} = require("./middlewares/validators/urlValidator");
const { handleErrorMiddleware } = require("./middlewares/errors/errorHandler");
const dbUtils = require("./utils/dbUtils/dbCrud");
const { shortURL } = require("./services/shortner/urlShortner");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});


app.post('/login', (req, res) => {
  res.status(200).json({
    token: 'abcd'
  })
})

app.post("/short-url", validateUrlMiddleware, async (req, res) => {
  const { url: originalUrl } = req.body;
  const shortnedUrl = await shortURL(originalUrl)
  const content = {
    shortnedUrl,
    originalUrl,
    userId: 1
  }
  const { insertId: id } = await dbUtils.create('urls', content)
  res.status(200).json({
    id,
    shortnedUrl,
    originalUrl
  });
});

app.use(handleErrorMiddleware);

module.exports = app;
