const path = require('path');
const fs = require('fs');
const db = require('../models');

exports.listAssignments = async (req, res) => {
  try {
    const assignments = await db.Tugas.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.render('admin/assignment/index', { assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data tugas' });
  }
};

exports.showForm = (req, res) => {
  res.render('admin/assignment/form');
};

exports.addAssignment = async (req, res) => {
  try {
    const { judul, deskripsi, link } = req.body;
    let filePath = null;

    if (req.file) {
      filePath = `/uploads/${req.file.filename}`;
    } else if (link) {
      filePath = link;
    }

    await db.Tugas.create({
      judul,
      deskripsi,
      file_path: filePath,
      tenggat_waktu: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari dari sekarang
      status: 'aktif'
    });

    res.redirect('/admin/assignment');
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat membuat tugas' });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await db.Tugas.findByPk(id);
    
    if (assignment) {
      // Hapus file jika ada
      if (assignment.file_path && assignment.file_path.startsWith('/uploads/')) {
        fs.unlink(path.join(__dirname, '../../public', assignment.file_path), err => {
          if (err) console.error('Gagal hapus file:', err);
        });
      }
      
      await assignment.destroy();
    }
    
    res.redirect('/admin/assignment');
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat menghapus tugas' });
  }
};