const path = require('path');
const fs = require('fs');
const db = require('../models');

exports.listAssignments = async (req, res) => {
  try {
    const assignments = await db.Tugas.findAll({
      where: { status: 'aktif' },
      order: [['createdAt', 'DESC']]
    });
    res.render('user/assignment/index', { assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data tugas' });
  }
};

exports.detailAssignment = async (req, res) => {
  try {
    const assignment = await db.Tugas.findByPk(req.params.id);
    if (!assignment) return res.redirect('/assignment');

    const studentSubmissions = await db.PengumpulanTugas.findAll({
      where: { id_tugas: req.params.id },
      include: [{ model: db.User, as: 'User' }],
      order: [['createdAt', 'DESC']]
    });

    res.render('user/assignment/detail', { assignment, studentSubmissions });
  } catch (error) {
    console.error('Error fetching assignment detail:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil detail tugas' });
  }
};

exports.submitForm = async (req, res) => {
  try {
    const assignment = await db.Tugas.findByPk(req.params.id);
    if (!assignment) return res.redirect('/assignment');
    res.render('user/assignment/form', { assignment });
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data tugas' });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { submissionLink, submissionText } = req.body;
    let filePath = null;

    if (req.file) {
      filePath = `/uploads/submissions/${req.file.filename}`;
    }

    // Get user from session
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Anda harus login terlebih dahulu' });
    }

    await db.PengumpulanTugas.create({
      id_tugas: assignmentId,
      id_user: userId,
      link_submission: submissionLink,
      teks_submission: submissionText,
      file_submission: filePath,
      waktu_pengumpulan: new Date(),
      status: 'submitted'
    });

    res.redirect(`/assignment/${assignmentId}`);
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengumpulkan tugas' });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await db.PengumpulanTugas.findByPk(id);
    
    if (submission) {
      // Hapus file jika ada
      if (submission.file_submission && submission.file_submission.startsWith('/uploads/submissions/')) {
        fs.unlink(path.join(__dirname, '../../public', submission.file_submission), err => {
          if (err) console.error('Gagal hapus file submission:', err);
        });
      }
      
      const assignmentId = submission.id_tugas;
      await submission.destroy();
      return res.redirect(`/assignment/${assignmentId}`);
    }
    
    res.redirect('/assignment');
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat menghapus submission' });
  }
};