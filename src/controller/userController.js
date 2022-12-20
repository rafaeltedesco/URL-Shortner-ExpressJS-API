const userService = require("../services/users/userService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  res.status(200).json(token);
};


module.exports = {
    login
}