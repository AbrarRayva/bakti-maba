const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.get("/", controller.viewLoginPage);
router.post("/", controller.login);
router.get("/logout", controller.logout);

module.exports = router;
