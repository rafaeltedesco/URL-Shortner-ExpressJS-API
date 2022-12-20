const jwt = require('jsonwebtoken')

const generateToken = async (payload) => {
    return new Promise(resolve => {
        const token = jwt.sign(payload, process.env.PRIVATE_KEY_JWT)
        resolve(token)
    })
}

module.exports = {
    generateToken
}