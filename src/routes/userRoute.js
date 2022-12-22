const { Router } = require("express");
const userController = require("../controller/userController");
const { isAuthenticated } = require("../middlewares/auth/authUser");
const { validUserData } = require("../middlewares/validators/userValidator");

const router = Router();

router.get('/urls', isAuthenticated, userController.showAllUrls)
router.post("/login", userController.login);
router.post('/new-user', validUserData, userController.createProfile)

module.exports = router;
