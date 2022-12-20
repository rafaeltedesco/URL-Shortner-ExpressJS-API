const { Router } = require("express");
const {
  validateUrlMiddleware,
} = require("../middlewares/validators/urlValidator");
const { isAuthenticated } = require("../middlewares/auth/authUser");
const { shortURL } = require("../services/shortner/urlShortner");
const dbUtils = require("../utils/dbUtils/dbCrud");

const router = Router();

router.post(
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

module.exports = router;
