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
    if (urls.length === 0) return res.status(404).json({
        message: "user does not have shortned urls yet"
    })
    res.status(200).json(urls)
}

const createProfile = async (req, res) => {
    const userData = req.userData
    await userService.create(userData)
    const { email, password } = userData
    const token = await userService.login(email, password);
    res.status(201).json(token)
}

module.exports = {
    login,
    showAllUrls,
    createProfile
}