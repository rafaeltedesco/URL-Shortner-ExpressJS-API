const { decodeTokenJWT } = require("../../services/jwt/tokenValidator");
const { headerKeyNotProvided, headerValueIsNotValid } = require("../../utils/errors/errorsResponses");

const isAuthenticated = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(headerKeyNotProvided('token'))
  const token = authorization.split(" ")[1];
  try {
    const userData = await decodeTokenJWT(token);
  req.user = userData;
  next();
  }
  catch(err) {
    next(headerValueIsNotValid('token'))
  }
  
};

module.exports = {
  isAuthenticated,
};
