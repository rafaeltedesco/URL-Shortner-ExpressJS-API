const jwt = require('jsonwebtoken')

const decodeTokenJWT = async (token) => {
    const userData = jwt.verify(token, process.env.PRIVATE_KEY_JWT)
    return userData;
}

module.exports = {
    decodeTokenJWT
}