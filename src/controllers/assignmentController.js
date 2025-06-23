const path = require('path');
const fs = require('fs');
const { Tugas, PengumpulanTugas, User } = require('../models');
const upload = require('../middleware/upload');

// Display a list of all assignments for students
exports.listAssignments = async (req, res) => {
    try {
        const assignments = await Tugas.findAll({ order: [['deadline', 'ASC']] });
        const userId = 1; // Hardcoded user ID
        const submissions = await PengumpulanTugas.findAll({ where: { id_user: userId } });
        
        const submissionMap = submissions.reduce((map, sub) => {
            map[sub.id_tugas] = sub;
            return map;
        }, {});

        res.render('user/assignment/index', {
            title: 'Daftar Penugasan',
            assignments,
            submissionMap,
            layout: 'layouts/main'
        });
    } catch (error) {
        console.error('Error in listAssignments:', error);
        res.status(500).render('error', { message: 'Gagal mengambil daftar tugas.' });
    }
};

// Display the detail of a single assignment
exports.getAssignmentDetail = async (req, res) => {
    try {
        const assignment = await Tugas.findByPk(req.params.id);
        if (!assignment) {
            req.flash('error_msg', 'Tugas tidak ditemukan.');
            return res.redirect('/assignment');
        }
        
        const userId = 1; // Hardcoded user ID
        const submission = await PengumpulanTugas.findOne({
            where: { id_tugas: req.params.id, id_user: userId }
        });

        res.render('user/assignment/detail', {
            title: `Detail Tugas: ${assignment.nama_tugas}`,
            assignment,
            userSubmission: submission,
            layout: 'layouts/main'
        });
    } catch (error) {
        console.error('Error in getAssignmentDetail:', error);
        res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil detail tugas' });
    }
};

// Handle assignment submission
exports.submitAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const { link_submission } = req.body;
        const userId = 1; // Hardcoded user ID

        let file_submission = null;
        if (req.file) {
            file_submission = `/uploads/submissions/${req.file.filename}`;
        }

        let submission = await PengumpulanTugas.findOne({ where: { id_tugas: id, id_user: userId } });

        if (submission) {
            submission.file_submission = file_submission || submission.file_submission;
            submission.link_submission = link_submission || submission.link_submission;
            submission.waktu_pengumpulan = new Date();
            await submission.save();
            req.flash('success_msg', 'Tugas berhasil diperbarui!');
        } else {
            await PengumpulanTugas.create({
                id_tugas: id,
                id_user: userId,
                file_submission,
                link_submission,
                waktu_pengumpulan: new Date()
            });
            req.flash('success_msg', 'Tugas berhasil dikumpulkan!');
        }

        res.redirect(`/assignment/${id}`);
    } catch (error) {
        console.error('Error in submitAssignment:', error);
        req.flash('error_msg', 'Gagal mengumpulkan tugas.');
        res.redirect(`/assignment/${id}`);
    }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params; // This id is submission id
    const submission = await PengumpulanTugas.findByPk(id);
    
    if (submission) {
      const assignmentId = submission.id_tugas;
      // Hapus file jika ada
      if (submission.file_submission && submission.file_submission.startsWith('/uploads/submissions/')) {
        fs.unlink(path.join(__dirname, '../../public', submission.file_submission), err => {
          if (err) console.error('Gagal hapus file submission:', err);
        });
      }
      
      await submission.destroy();
      return res.redirect(`/assignment/${assignmentId}`);
    }
    
    res.redirect('/assignment');
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat menghapus submission' });
  }
};
