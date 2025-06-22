const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');
const dashboardController = require('../controllers/dashboardController');

// Admin dashboard route
router.get('/dashboard', dashboardController.adminDashboard);

// Routes untuk admin jadwal
router.get('/jadwal', jadwalController.adminIndex);
router.get('/jadwal/create', jadwalController.create);
router.get('/jadwal/edit/:id', jadwalController.edit);

// API routes untuk admin jadwal
router.post('/jadwal', jadwalController.store);
router.put('/jadwal/:id', jadwalController.update);
router.delete('/jadwal/:id', jadwalController.destroy);

module.exports = router; 