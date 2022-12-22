const dbUtils = require("../../utils/dbUtils/dbCrud");
const { generateToken } = require("../jwt/tokenGenerator");

const login = async (email, password, passwordHasherService) => {
  const user = await getUserDataIfExists(email);
  if (!user) {
    const err = new Error('User not found')
    err.status = 404
    throw err
  }
  if (await passwordHasherService.verifyPassword(password, user.password)) {
    delete user.password
    const token = await generateToken(user)
    return {
      token,
    };
  }
  return false;
};

const getUserDataIfExists = async (email) => {
  const [user] = await dbUtils.find("users", {
    field: "email",
    value: email,
  });
  if (!user) return null;
  return user;
};

const create = async (userData, passwordHasherService) => {
  const hashedPassword = await passwordHasherService.hashPassword(userData.password)
  userData.password = hashedPassword
  const result = await dbUtils.create('users', userData)
  return result
}

module.exports = {
  login,
  create
};
