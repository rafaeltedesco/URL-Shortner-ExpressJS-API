require("dotenv").config();
const express = require("express");
const {
  validateUrlMiddleware,
} = require("./middlewares/validators/urlValidator");
const { handleErrorMiddleware } = require("./middlewares/errors/errorHandler");
const dbUtils = require("./utils/dbUtils/dbCrud");
const { shortURL } = require("./services/shortner/urlShortner");
const userService = require('./services/users/userService')

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const token = await userService.login(email, password)
  res.status(200).json(token)
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
