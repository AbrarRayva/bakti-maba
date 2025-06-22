const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminMaterialCtrl = require('../controllers/adminmaterialController');
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

router.get('/', requireAdmin, adminMaterialCtrl.listMaterials);
router.get('/new', requireAdmin, adminMaterialCtrl.showForm);
router.post('/', requireAdmin, upload.single('file'), adminMaterialCtrl.addMaterial);
router.post('/:id/delete', requireAdmin, adminMaterialCtrl.deleteMaterial);

module.exports = router;