const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');
const { requireAuth } = require('../middleware/auth');

// Routes untuk peserta/mahasiswa
router.get('/', requireAuth, jadwalController.index);
router.get('/:id', requireAuth, jadwalController.show);
router.get('/api/export', requireAuth, jadwalController.exportCalendar);

module.exports = router; 