const dbUtils = require("../../utils/dbUtils/dbCrud");

const login = async (email, password) => {
  const user = await getUserDataIfExists(email);
  if (Number(user.password) === Number(password)) {
    return {
      token: "abcd",
    };
  }
  return false;
};

const getUserDataIfExists = async (email) => {
  const user = await dbUtils.findOne("users", {
    columnName: "email",
    value: email,
  });
  if (!user) return null;
  return user;
};

module.exports = {
  login,
};
