const { isValidUrl } = require("../../helpers/validators/urlValidator");
const { fieldNotFound, invalidFieldData } = require("../../utils/errors/errorsResponses");

const validateUrlMiddleware = (req, _res, next) => {
  const { url } = req.body;
  if (!url) next(fieldNotFound('url'));
  if (!isValidUrl(url)) {
    next(invalidFieldData('url'));
  }
  next();
};

module.exports = {
  validateUrlMiddleware,
};
