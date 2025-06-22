const express = require('express');
const router = express.Router();
const adminMaterialController = require('../controllers/adminmaterialController');

router.get('/', adminMaterialController.viewMaterials);
router.get('/add', adminMaterialController.showAddMaterialForm);
router.post('/add', adminMaterialController.addMaterial);
router.delete('/delete/:id', adminMaterialController.deleteMaterial);

module.exports = router;