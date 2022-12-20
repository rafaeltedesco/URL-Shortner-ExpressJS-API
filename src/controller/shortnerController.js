const UrlShortnerService = require("../services/shortner/urlShortner");
const dbUtils = require("../utils/dbUtils/dbCrud");

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

module.exports = {
    shortUrl
}