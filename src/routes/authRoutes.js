const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.get("/", controller.viewLoginPage);

module.exports = router;
