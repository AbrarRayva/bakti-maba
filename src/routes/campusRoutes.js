const express = require('express');
const router = express.Router();
const controller = require('../controllers/campusController');

router.get('/', controller.getMap);

module.exports = router;

// Form gabungan tambah kegiatan dan gedung
router.get('/add', controller.getAddCombinedForm);
router.post('/add', controller.addCombined);
