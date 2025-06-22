const express = require('express');
const router = express.Router();
const controller = require('../controllers/absensiController');

// GPS
router.get('/gps', controller.absenDenganGPS);
router.post('/gps', controller.submitGPS);

// QR Code Scan
router.get('/absensi/scan', controller.scanQRPage);
router.post('/absensi/scan', controller.submitQRScan);

// QR Code Generate
router.get('/qr', controller.generateQRForm);
router.post('/qr', controller.generateQRCode);

// Manual Absen
router.get('/manual', controller.formManualAbsen);
router.post('/manual', controller.inputManualAbsen);

// Laporan
router.get('/report/user', controller.laporanUser);
router.get('/report/admin', controller.laporanAdmin);

// PDF Download
router.post('/report/admin/pdf', controller.downloadPDF);

// Hapus Absen
router.post('/report/delete', controller.deleteAbsen);

module.exports = router;
