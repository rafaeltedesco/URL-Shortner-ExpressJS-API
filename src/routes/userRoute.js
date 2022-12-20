const { Router } = require("express");
const userController = require("../controller/userController");

const router = Router();

router.post("/login", userController.login);

module.exports = router;
