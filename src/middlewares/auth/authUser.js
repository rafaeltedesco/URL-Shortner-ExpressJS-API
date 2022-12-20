const { decodeTokenJWT } = require("../../services/jwt/tokenValidator");
const { headerKeyNotProvided } = require("../../utils/errors/errorsResponses");

const isAuthenticated = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(headerKeyNotProvided('token'))
  const token = authorization.split(" ")[1];
  const userData = await decodeTokenJWT(token);
  req.user = userData;
  next();
};

module.exports = {
  isAuthenticated,
};
