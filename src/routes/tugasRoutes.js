const express = require('express');
const router = express.Router();
const tugasController = require('../controllers/tugasController');
const multer = require('multer');

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes untuk mahasiswa
router.get('/mahasiswa/tugas', tugasController.viewMahasiswa);
router.post('/mahasiswa/tugas', upload.single('tugas'), tugasController.upload);
router.post('/mahasiswa/revisi', upload.single('tugas'), tugasController.uploadRevisi);

// Routes untuk panitia
router.get('/panitia/tugas', tugasController.viewPanitia);
router.get('/panitia/tugas/:id/download', tugasController.download);

module.exports = router; // Pastikan ini ada