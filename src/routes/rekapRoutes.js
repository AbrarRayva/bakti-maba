const express = require('express');
const router = express.Router();
const rekapController = require('../controllers/rekapController');

router.get('/', rekapController.showRekap);

module.exports = router;
