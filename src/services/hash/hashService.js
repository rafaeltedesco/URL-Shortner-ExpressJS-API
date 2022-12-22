const crypto = require('crypto');

const generateRandomId = () => {
    return crypto.randomBytes(6).toString('hex')
  }

  module.exports = {
    generateRandomId
  }