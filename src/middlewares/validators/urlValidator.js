const { isValidUrl } = require("../../helpers/validators/urlValidator");

const validateUrlMiddleware = (req, _res, next) => {
  const { url } = req.body;
  if (!url) next({ status: 400, message: '"url" field not found' });
  if (!isValidUrl(url)) {
    next({ status: 422, message: '"url" invalid' });
  }
  next();
};

module.exports = {
  validateUrlMiddleware,
};
