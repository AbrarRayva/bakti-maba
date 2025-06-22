const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');

// Routes untuk peserta/mahasiswa
router.get('/', jadwalController.index);
router.get('/api/export', jadwalController.exportCalendar);

// Routes untuk admin/panitia
router.get('/admin', jadwalController.adminIndex);
router.get('/admin/create', jadwalController.create);
router.get('/admin/edit/:id', jadwalController.edit);

// API routes untuk admin
router.post('/admin', jadwalController.store);
router.post('/admin/jadwal', jadwalController.store); // opsional, jika ada form yang submit ke /admin/jadwal
router.post('/admin/jadwal/:id', jadwalController.update); // opsional, jika ada form yang submit ke /admin/jadwal/:id
router.put('/admin/jadwal/:id', jadwalController.update);
router.delete('/admin/jadwal/:id', jadwalController.destroy);

module.exports = router; 