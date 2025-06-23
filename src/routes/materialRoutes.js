const express = require('express');
const router = express.Router();
const materialCtrl = require('../controllers/materialController');

router.get('/', materialCtrl.viewMaterials);
router.get('/download/:id', materialCtrl.downloadMaterial);

module.exports = router;