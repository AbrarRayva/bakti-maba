const express = require('express');
const router = express.Router();
const materialCtrl = require('../controllers/materialController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, materialCtrl.viewMaterials);
router.get('/download/:id', requireAuth, materialCtrl.downloadMaterial);

module.exports = router;