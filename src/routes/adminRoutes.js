const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');
const dashboardController = require('../controllers/dashboardController');
const userController = require('../controllers/userController');
const kelompokController = require('../controllers/kelompokController');

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

// Routes untuk admin users
router.get('/users', userController.index);
router.get('/users/create', userController.create);
router.get('/users/edit/:id', userController.edit);

// API routes untuk admin users
router.post('/users', userController.store);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);
router.post('/users/:id/toggle-block', userController.toggleBlock);

// Routes untuk admin kelompok
router.get('/kelompok', kelompokController.index);
router.get('/kelompok/create', kelompokController.create);
router.get('/kelompok/edit/:id', kelompokController.edit);
router.get('/kelompok/:id', kelompokController.show);

// API routes untuk admin kelompok
router.post('/kelompok', kelompokController.store);
router.put('/kelompok/:id', kelompokController.update);
router.delete('/kelompok/:id', kelompokController.destroy);

module.exports = router; 