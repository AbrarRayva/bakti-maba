const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminCtrl = require('../controllers/adminassignmentController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/uploads';
    const fs = require('fs');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/assignment', adminCtrl.listAssignments);
router.get('/assignment/new', adminCtrl.showForm);
router.post('/assignment', upload.single('file'), adminCtrl.addAssignment);
router.post('/assignment/:id/delete', adminCtrl.deleteAssignment);

module.exports = router;