const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/assignmentController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const submissionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/uploads/submissions';
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-submission-' + path.extname(file.originalname))
});
const uploadSubmission = multer({ storage: submissionStorage });

router.get('/assignment', ctrl.listAssignments);
router.get('/assignment/:id', ctrl.detailAssignment);
router.get('/assignment/:id/submit', ctrl.submitForm);
router.post('/assignment/:id/submit', uploadSubmission.single('file'), ctrl.submitAssignment);
router.post('/assignment/submission/:id/delete', ctrl.deleteSubmission);

module.exports = router;