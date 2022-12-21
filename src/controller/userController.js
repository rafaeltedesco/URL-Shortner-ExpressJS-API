const userService = require("../services/users/userService");
const urlService = require('../services/urls/urlService')

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  res.status(200).json(token);
};

const showAllUrls = async (req, res) => {
    const { id } = req.user
    const urls = await urlService.getUrlsByPersonId(id)
    res.status(200).json(urls)
}

const createProfile = async (req, res) => {
    const userData = req.body
    const [{insertId}] = await userService.create(userData)
    delete userData.password
    const newUser = {
        id: insertId,
        ...userData
    }
    res.status(201).json(newUser)
}

module.exports = {
    login,
    showAllUrls,
    createProfile
}