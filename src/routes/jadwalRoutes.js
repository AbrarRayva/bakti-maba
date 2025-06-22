const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');

// Routes untuk mahasiswa
router.get('/', jadwalController.showJadwalPage);
router.get('/api', jadwalController.getAllJadwal);
router.get('/api/kelompok/:kelompok', jadwalController.getJadwalByKelompok);
router.get('/api/export', jadwalController.exportJadwalToCalendar);
router.get('/api/notifications', jadwalController.getJadwalForNotification);

// Routes untuk admin/panitia
router.get('/admin', jadwalController.showAdminJadwalPage);
router.get('/admin/create', jadwalController.showCreateJadwalPage);
router.get('/admin/edit/:id', jadwalController.showEditJadwalPage);

// API routes untuk admin
router.post('/admin/api', jadwalController.createJadwal);
router.put('/admin/api/:id', jadwalController.updateJadwal);
router.delete('/admin/api/:id', jadwalController.deleteJadwal);

module.exports = router; 