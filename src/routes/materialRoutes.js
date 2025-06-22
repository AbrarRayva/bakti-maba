const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');


router.get('/',  materialController.viewMaterials);
router.get('/download/:id',  materialController.downloadMaterial);

module.exports = router;