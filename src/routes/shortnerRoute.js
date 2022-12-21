const { Router } = require("express");
const {
  validateUrlMiddleware,
} = require("../middlewares/validators/urlValidator");
const { isAuthenticated } = require("../middlewares/auth/authUser");
const shortnerController = require("../controller/shortnerController");
const urlService = require('../services/shortner/urlShortner')

const router = Router();

router.post(
  "/short-url",
  isAuthenticated,
  validateUrlMiddleware,
  shortnerController.shortUrl
);

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const originalUrl = await urlService.getOriginalURLFromId(id);
    res.redirect(302, originalUrl)
})
module.exports = router;
