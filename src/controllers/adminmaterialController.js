// controllers/adminmaterialController.js
const path = require('path');
const fs = require('fs');
const { Materi } = require('../models');

// Display list of materials
exports.listMaterials = async (req, res) => {
    try {
        const materials = await Materi.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.render('admin/material/index', {
            layout: 'layouts/admin',
            title: 'Manajemen Materi',
            materials,
            message: req.flash('message')
        });
    } catch (error) {
        console.error('Error fetching materials:', error);
        req.flash('message', 'Gagal mengambil data materi.');
        res.redirect('/admin/dashboard');
    }
};

// Show form to add new material
exports.showForm = (req, res) => {
    res.render('admin/material/form', {
        layout: 'layouts/admin',
        title: 'Tambah Materi Baru'
    });
};

// Handle adding new material
exports.addMaterial = async (req, res) => {
    try {
        const { judul_materi, deskripsi_materi } = req.body;

        if (!judul_materi || !deskripsi_materi || !req.file) {
            req.flash('message', 'Semua field (judul, deskripsi, dan file) harus diisi.');
            return res.redirect('/admin/material/new');
        }

        await Materi.create({
            judul_materi,
            deskripsi_materi,
            file_path: `/uploads/${req.file.filename}`,
            file_size: req.file.size,
            file_type: req.file.mimetype
        });

        req.flash('message', 'Materi berhasil ditambahkan.');
        res.redirect('/admin/material');
    } catch (error) {
        console.error('Error creating material:', error);
        req.flash('message', 'Terjadi kesalahan saat menambahkan materi.');
        res.redirect('/admin/material');
    }
};

// Handle deleting a material
exports.deleteMaterial = async (req, res) => {
    try {
        const material = await Materi.findByPk(req.params.id);

        if (material) {
            if (material.file_path) {
                const fullPath = path.join(__dirname, '../../public', material.file_path);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }
            await material.destroy();
            req.flash('message', 'Materi berhasil dihapus.');
        } else {
            req.flash('message', 'Materi tidak ditemukan.');
        }
    } catch (error) {
        console.error('Error deleting material:', error);
        req.flash('message', 'Terjadi kesalahan saat menghapus materi.');
    }
    res.redirect('/admin/material');
};

// Note: showForm is not needed if the form is on the index page.