const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Route untuk user biasa (per forum ID)
router.get('/chat/:id', forumController.showForumChat);
router.post('/chat/:id', forumController.sendMessage);

// Route untuk admin
router.get('/admin', forumController.showForumAdmin);
router.post('/admin', forumController.sendAdminMessage);
router.post('/pin/:id/:index', forumController.pinMessage);
router.post('/delete/:id/:index', forumController.deleteMessage);
router.post('/reply/:id/:index', forumController.replyMessage);
router.post('/react/:id/:index', forumController.reactMessage);

module.exports = router;
