const assignments = require('./adminassignmentController').assignments;
const path = require('path');
const fs = require('fs');

const submittedAssignments = []; // Simulasi penyimpanan tugas yang disubmit oleh mahasiswa

exports.listAssignments = (req, res) => {
  res.render('user/assignment/index', { assignments });
};

exports.detailAssignment = (req, res) => {
  const assignment = assignments.find(a => a.id === req.params.id);
  if (!assignment) return res.redirect('/assignment');

  const studentSubmissions = submittedAssignments.filter(s => s.assignmentId === req.params.id);
  res.render('user/assignment/detail', { assignment, studentSubmissions });
};

exports.submitForm = (req, res) => {
  const assignment = assignments.find(a => a.id === req.params.id);
  if (!assignment) return res.redirect('/assignment');
  res.render('user/assignment/form', { assignment });
};

exports.submitAssignment = (req, res) => {
  const assignmentId = req.params.id;
  const { studentName, studentId, submissionLink, submissionText } = req.body;
  let file = null;

  if (req.file) {
    file = `/uploads/submissions/${req.file.filename}`;
  }

  const newSubmission = {
    id: Date.now().toString(),
    assignmentId: assignmentId,
    studentName: studentName || 'Anonim',
    studentId: studentId || 'N/A',
    submissionLink: submissionLink,
    submissionText: submissionText,
    file: file,
    submittedAt: new Date().toISOString()
  };
  submittedAssignments.push(newSubmission);
  console.log('Tugas Disubmit (simulasi):', newSubmission);
  res.redirect(`/user/assignment/${assignmentId}`);
};

exports.deleteSubmission = (req, res) => {
  const { id } = req.params;
  const index = submittedAssignments.findIndex(s => s.id === id);
  if (index !== -1) {
    const filePath = submittedAssignments[index].file;
    if (filePath && filePath.startsWith('/uploads/submissions/')) {
        fs.unlink(path.join(__dirname, '../../public', filePath), err => {
            if (err) console.error('Gagal hapus file submission:', err);
        });
    }
    const assignmentId = submittedAssignments[index].assignmentId;
    submittedAssignments.splice(index, 1);
    return res.redirect(`/assignment/${assignmentId}`);
  }
  res.redirect('/user/assignment');
};