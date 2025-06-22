const express = require('express');
const router = express.Router();
const sertifikatController = require('../controllers/sertifikatController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/sertifikat/'); // Pastikan folder ini ada
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Hanya file PDF yang diperbolehkan'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.get('/', sertifikatController.listSiapSertifikat);
router.post('/kirim', upload.single('sertifikat'), sertifikatController.kirimSertifikat);
router.get('/peserta', sertifikatController.daftarPesertaSertifikat);
router.get('/peserta/:nama', sertifikatController.lihatSertifikat);
router.get('/download/:filename', sertifikatController.downloadSertifikat);

module.exports = router;
