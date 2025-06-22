const express = require('express');
const router = express.Router();
const nilaiController = require('../controllers/nilaiController');

router.get('/', nilaiController.list);
router.get('/beri/:id', nilaiController.formNilai);
router.post('/beri/:id', nilaiController.submitNilai); // cukup satu aja

module.exports = router;
