require("dotenv").config();
const cors = require("cors");
const express = require("express");

const { handleErrorMiddleware } = require("./middlewares/errors/errorHandler");
const userRouter = require("./routes/userRoute");
const welcomeRouter = require("./routes/welcomeRoute");
const shortnerRouter = require("./routes/shortnerRoute");

const app = express();

app.use(cors);
app.use(express.json());

app.use(welcomeRouter);
app.use(userRouter);
app.use(shortnerRouter);

app.use(handleErrorMiddleware);

module.exports = app;
