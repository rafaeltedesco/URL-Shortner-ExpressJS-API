require("dotenv").config();
const express = require("express");
const {
  validateUrlMiddleware,
} = require("./middlewares/validators/urlValidator");
const { handleErrorMiddleware } = require("./middlewares/errors/errorHandler");
const dbUtils = require("./utils/dbUtils/dbCrud");
const { shortURL } = require("./services/shortner/urlShortner");
const userRouter = require('./routes/userRoute')
const welcomeRouter = require('./routes/welcomeRoute')
const { isAuthenticated } = require("./middlewares/auth/authUser");

const app = express();

app.use(express.json());


app.use(welcomeRouter);
app.use(userRouter);

app.post(
  "/short-url",
  isAuthenticated,
  validateUrlMiddleware,
  async (req, res) => {
    const { url: originalUrl } = req.body;
    const shortnedUrl = await shortURL(originalUrl);
    const content = {
      shortnedUrl,
      originalUrl,
      userId: req.user.id,
    };
    const { insertId: id } = await dbUtils.create("urls", content);
    res.status(200).json({
      id,
      shortnedUrl,
      originalUrl,
    });
  }
);

app.use(handleErrorMiddleware);

module.exports = app;
