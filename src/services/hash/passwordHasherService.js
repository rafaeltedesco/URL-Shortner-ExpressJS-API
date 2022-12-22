const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(String(password), salt);
  return hashedPassword;
};

const verifyPassword = (password, passwordToCompare) => {
  const result = bcrypt.compare(String(password), passwordToCompare);
  return result
}

module.exports = {
  hashPassword,
  verifyPassword,
};
