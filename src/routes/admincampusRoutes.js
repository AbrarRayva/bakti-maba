const express = require('express');
const router = express.Router();
const admincampusController = require('../controllers/admincampusController');

// Route to display the list of activities
router.get('/campus', admincampusController.getActivities);

// Route to show the form for creating a new activity
router.get('/campus/new', admincampusController.getNewActivityForm);

// Route to handle the creation of a new activity
router.post('/campus', admincampusController.createActivity);

// Route to show the form for editing an activity
router.get('/campus/:id/edit', admincampusController.editActivityForm);

// Route to handle the update of an activity
router.put('/campus/:id', admincampusController.updateActivity);

// Route to handle the deletion of an activity
router.delete('/campus/:id', admincampusController.deleteActivity);

module.exports = router;