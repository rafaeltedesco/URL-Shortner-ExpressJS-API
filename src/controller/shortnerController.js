const UrlShortnerService = require("../services/shortner/urlShortner");
const dbUtils = require("../utils/dbUtils/dbCrud");
const urlService = require('../services/shortner/urlShortner');
const hashService = require('../services/hash')
const { handleASyncError } = require("../utils/handlers/asyncHandler");


const shortUrl = async (req, res) => {
    const { url: originalUrl } = req.body;
    const shortnedUrl = await UrlShortnerService.generateRandomStringASURLShortened(hashService);
    const content = {
      shortnedUrl,
      originalUrl,
      userId: req.user.id,
    };
    const { insertId: id } = await dbUtils.create("urls", content);
    return res.status(200).json({
      id,
      shortnedUrl,
      originalUrl,
    });
  }

const getOriginalURL = handleASyncError(async (req, res) => {
    const { id } = req.params;
    
    const originalUrl = await urlService.getOriginalURLFromId(id);
    res.redirect(302, originalUrl)
})

module.exports = {
    shortUrl,
    getOriginalURL
}