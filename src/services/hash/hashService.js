const crypto = require('crypto');

const generateRandomId = () => {
    return crypto.randomBytes(20).toString('hex')
  }

  module.exports = {
    generateRandomId
  }