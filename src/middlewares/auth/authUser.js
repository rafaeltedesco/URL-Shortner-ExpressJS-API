const { decodeTokenJWT } = require("../../services/jwt/tokenValidator");

const isAuthenticated = async (req, _res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const userData = await decodeTokenJWT(token);
  req.user = userData;
  next();
};

module.exports = {
  isAuthenticated,
};
