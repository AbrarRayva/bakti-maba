const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminCtrl = require('../controllers/adminassignmentController');
const { requireAdmin } = require('../middleware/auth');

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

router.get('/assignment', requireAdmin, adminCtrl.listAssignments);
router.get('/assignment/new', requireAdmin, adminCtrl.showForm);
router.post('/assignment', requireAdmin, upload.single('file'), adminCtrl.addAssignment);
router.post('/assignment/:id/delete', requireAdmin, adminCtrl.deleteAssignment);

module.exports = router;