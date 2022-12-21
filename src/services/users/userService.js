const dbUtils = require("../../utils/dbUtils/dbCrud");
const { generateToken } = require("../jwt/tokenGenerator");

const login = async (email, password) => {
  const user = await getUserDataIfExists(email);
  if (Number(user.password) === Number(password)) {
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

const create = async (userData) => {
  const [result] = await dbUtils.create('users', userData)
  return result
}

module.exports = {
  login,
  create
};
