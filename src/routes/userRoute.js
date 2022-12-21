const { Router } = require("express");
const userController = require("../controller/userController");
const { isAuthenticated } = require("../middlewares/auth/authUser");

const router = Router();

router.get('/urls', isAuthenticated, userController.showAllUrls)
router.post("/login", userController.login);
router.post('/new-user', userController.createProfile)

module.exports = router;
