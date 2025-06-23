const express = require('express');
const router = express.Router();
const adminAssignmentController = require('../controllers/adminassignmentController');
const upload = require('../middleware/upload'); // Assuming you have this middleware

// Main assignment page
router.get('/assignment', adminAssignmentController.getAssignments);

// Form to create a new assignment
router.get('/assignment/new', adminAssignmentController.getNewAssignmentForm);
router.post('/assignment', upload.single('file'), adminAssignmentController.createAssignment);

// Form to edit an assignment
router.get('/assignment/:id/edit', adminAssignmentController.editAssignmentForm);
router.put('/assignment/:id', upload.single('file'), adminAssignmentController.updateAssignment);

// Delete an assignment
router.delete('/assignment/:id', adminAssignmentController.deleteAssignment);

module.exports = router;