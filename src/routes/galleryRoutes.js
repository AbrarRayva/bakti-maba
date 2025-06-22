const express = require("express");
const router = express.Router();
const controller = require("../controllers/galleryController");
const { requireAuth } = require('../middleware/auth');

router.get("/", requireAuth, controller.galleryIndex);

module.exports = router; 