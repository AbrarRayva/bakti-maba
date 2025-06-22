// controllers/adminmaterialController.js
const path = require('path');
const fs = require('fs');
const db = require('../models');

exports.listMaterials = async (req, res) => {
  try {
    const materials = await db.Materi.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.render('admin/material/index', { materials });
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data materi' });
  }
};

exports.showForm = (req, res) => {
  res.render('admin/material/form');
};

exports.addMaterial = async (req, res) => {
  try {
    const { judul, deskripsi, link } = req.body;
    let filePath = null;

    if (req.file) {
      filePath = `/uploads/${req.file.filename}`;
    } else if (link) {
      filePath = link;
    }

    await db.Materi.create({
      judul,
      deskripsi,
      nama_file: req.file ? req.file.originalname : 'Link Materi',
      file_path: filePath,
      tipe_file: req.file ? req.file.mimetype : 'application/link',
      ukuran_file: req.file ? req.file.size : 0,
      jumlah_download: 0
    });

    res.redirect('/admin/material');
  } catch (error) {
    console.error('Error creating material:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat membuat materi' });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await db.Materi.findByPk(id);
    
    if (material) {
      // Hapus file jika ada
      if (material.file_path && material.file_path.startsWith('/uploads/')) {
        fs.unlink(path.join(__dirname, '../../public', material.file_path), err => {
          if (err) console.error('Gagal hapus file:', err);
        });
      }
      
      await material.destroy();
    }
    
    res.redirect('/admin/material');
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat menghapus materi' });
  }
};