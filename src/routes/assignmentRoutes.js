const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Konfigurasi multer untuk upload file tugas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Import controller
const controller = require('../controllers/assignmentController');

// Route untuk daftar tugas
router.get('/', controller.getAllAssignments);

// Route untuk menambahkan tugas (oleh panitia)
router.get('/new', controller.getAddAssignmentForm);
router.post('/new', controller.addAssignment);

// Route untuk melihat detail tugas
router.get('/:id', controller.getAssignmentDetail);

// Route untuk submit tugas (mahasiswa)
router.post('/:id/submit', upload.single('file'), controller.submitAssignment);

module.exports = router;
