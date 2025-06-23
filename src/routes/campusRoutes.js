const express = require('express');
const router = express.Router();
const campusCtrl = require('../controllers/campusController');

router.get('/campus', campusCtrl.getMap);

module.exports = router;