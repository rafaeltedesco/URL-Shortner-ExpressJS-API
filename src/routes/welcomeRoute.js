const { Router } = require("express");
const { welcome } = require("../controller/welcomeController");

const router = Router();

router.get("/", welcome);

module.exports = router;
