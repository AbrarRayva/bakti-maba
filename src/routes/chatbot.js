const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController'); // pastikan path benar

router.get('/', chatbotController.showChat);
router.post('/', chatbotController.sendMessage);

module.exports = router;
