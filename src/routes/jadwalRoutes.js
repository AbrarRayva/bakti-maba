const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');

// Routes untuk peserta/mahasiswa
router.get('/', jadwalController.index);
router.get('/:id', jadwalController.show);
router.get('/api/export', jadwalController.exportCalendar);

module.exports = router; 