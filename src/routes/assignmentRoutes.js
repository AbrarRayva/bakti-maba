const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const upload = require('../middleware/upload');

// Middleware to configure multer for submission uploads
const submissionUpload = upload.single('file');

// Route to display the list of assignments
router.get('/assignment', assignmentController.listAssignments);

// Route to display assignment details
router.get('/assignment/:id', assignmentController.getAssignmentDetail);

// Route to handle assignment submission
router.post('/assignment/:id/submit', submissionUpload, assignmentController.submitAssignment);

module.exports = router;