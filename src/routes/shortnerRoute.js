const { Router } = require("express");
const {
  validateUrlMiddleware,
} = require("../middlewares/validators/urlValidator");
const { isAuthenticated } = require("../middlewares/auth/authUser");
const shortnerController = require("../controller/shortnerController");

const router = Router();

router.post(
  "/short-url",
  isAuthenticated,
  validateUrlMiddleware,
  shortnerController.shortUrl
);

module.exports = router;
