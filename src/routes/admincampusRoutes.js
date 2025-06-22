const express = require('express');
const router = express.Router();
const adminCampusCtrl = require('../controllers/admincampusController');
const { requireAdmin } = require('../middleware/auth');

router.get('/campus', requireAdmin, adminCampusCtrl.getMap); // /admin2/campus
router.get('/campus/new', requireAdmin, adminCampusCtrl.showForm); // /admin2/campus/add
router.post('/campus', requireAdmin, adminCampusCtrl.addActivity); // /admin2/campus/add
router.post('/campus/:id/delete', requireAdmin, adminCampusCtrl.deleteActivity); // /admin2/campus/:id/delete
router.get('/campus/:id/edit', requireAdmin, adminCampusCtrl.showEditForm); // /admin2/campus/:id/edit
router.post('/campus/:id/edit', requireAdmin, adminCampusCtrl.updateActivity); // /admin2/campus/:id/edit

module.exports = router;