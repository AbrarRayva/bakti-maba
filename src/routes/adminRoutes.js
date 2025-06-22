const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');
const dashboardController = require('../controllers/dashboardController');
const userController = require('../controllers/userController');
const kelompokController = require('../controllers/kelompokController');
const { requireAdmin } = require('../middleware/auth');

// Admin dashboard route
router.get('/dashboard', requireAdmin, dashboardController.adminDashboard);

// Routes untuk admin jadwal
router.get('/jadwal', requireAdmin, jadwalController.adminIndex);
router.get('/jadwal/create', requireAdmin, jadwalController.create);
router.get('/jadwal/edit/:id', requireAdmin, jadwalController.edit);

// API routes untuk admin jadwal
router.post('/jadwal', requireAdmin, jadwalController.store);
router.put('/jadwal/:id', requireAdmin, jadwalController.update);
router.delete('/jadwal/:id', requireAdmin, jadwalController.destroy);

// Routes untuk admin users
router.get('/users', requireAdmin, userController.index);
router.get('/users/create', requireAdmin, userController.create);
router.get('/users/edit/:id', requireAdmin, userController.edit);

// API routes untuk admin users
router.post('/users', requireAdmin, userController.store);
router.put('/users/:id', requireAdmin, userController.update);
router.delete('/users/:id', requireAdmin, userController.destroy);
router.post('/users/:id/toggle-block', requireAdmin, userController.toggleBlock);

// Routes untuk admin kelompok
router.get('/kelompok', requireAdmin, kelompokController.index);
router.get('/kelompok/create', requireAdmin, kelompokController.create);
router.get('/kelompok/edit/:id', requireAdmin, kelompokController.edit);
router.get('/kelompok/:id', requireAdmin, kelompokController.show);

// API routes untuk admin kelompok
router.post('/kelompok', requireAdmin, kelompokController.store);
router.put('/kelompok/:id', requireAdmin, kelompokController.update);
router.delete('/kelompok/:id', requireAdmin, kelompokController.destroy);

module.exports = router; 