const express = require('express');
const router = express.Router();
const campusCtrl = require('../controllers/campusController');
const { requireAuth } = require('../middleware/auth');

router.get('/campus', requireAuth, campusCtrl.getMap);

module.exports = router;