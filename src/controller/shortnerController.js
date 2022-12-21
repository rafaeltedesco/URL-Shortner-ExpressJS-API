const UrlShortnerService = require("../services/shortner/urlShortner");
const dbUtils = require("../utils/dbUtils/dbCrud");
const urlService = require('../services/shortner/urlShortner')

const shortUrl = async (req, res) => {
    const { url: originalUrl } = req.body;
    const shortnedUrl = await UrlShortnerService.shortURL(originalUrl);
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

const getOriginalURL = async (req, res) => {
    const { id } = req.params;
    const originalUrl = await urlService.getOriginalURLFromId(id);
    res.redirect(302, originalUrl)
}

module.exports = {
    shortUrl,
    getOriginalURL
}