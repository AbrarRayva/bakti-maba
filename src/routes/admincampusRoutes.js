const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admincampusController');

router.get('/campus', adminCtrl.getMap); // /admin2/campus
router.get('/campus/add', adminCtrl.showForm); // /admin2/campus/add
router.post('/campus/add', adminCtrl.addActivity); // /admin2/campus/add
router.post('/campus/:id/delete', adminCtrl.deleteActivity); // /admin2/campus/:id/delete
router.get('/campus/:id/edit', adminCtrl.showEditForm); // /admin2/campus/:id/edit
router.post('/campus/:id/edit', adminCtrl.updateActivity); // /admin2/campus/:id/edit

module.exports = router;