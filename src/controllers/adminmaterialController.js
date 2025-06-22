// controllers/adminmaterialController.js
const fs = require('fs');
const path = require('path');

let materials = [
    {
        id: '1',
        title: 'Panduan Penggunaan Aplikasi',
        description: 'Petunjuk penggunaan aplikasi Bakti-Maba untuk mahasiswa baru',
        fileName: 'panduan-aplikasi.pdf',
        filePath: '/dummy/panduan-aplikasi.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 2, // 2MB
        downloads: 0,
        createdAt: new Date('2025-06-01')
    },
    {
        id: '2',
        title: 'Modul Pembelajaran 1',
        description: 'Materi pengenalan kampus dan sistem perkuliahan',
        fileName: 'modul-pembelajaran-1.pdf',
        filePath: '/dummy/modul-pembelajaran-1.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 3, // 3MB
        downloads: 0,
        createdAt: new Date('2025-06-05')
    },
    {
        id: '3',
        title: 'Jadwal Kegiatan Maba',
        description: 'Jadwal lengkap kegiatan mahasiswa baru',
        fileName: 'jadwal-kegiatan.pdf',
        filePath: '/dummy/jadwal-kegiatan.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 1, // 1MB
        downloads: 0,
        createdAt: new Date('2025-06-10')
    }
];

exports.viewMaterials = async (req, res) => {
    try {
        // Sort materi berdasarkan tanggal dibuat (terbaru pertama)
        const sortedMaterials = [...materials].sort((a, b) => b.createdAt - a.createdAt);
        
        res.render('admin/material/index', {
            title: 'Materi',
            user: req.user,
            materials: sortedMaterials
        });
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).render('error', {
            message: 'Terjadi kesalahan saat mengambil data materi'
        });
    }
};

exports.showAddMaterialForm = (req, res) => {
    res.render('admin/material/add', {
        title: 'Tambah Materi Baru',
        user: req.user,
        error: null,
        formData: {}
    });
};

exports.addMaterial = async (req, res) => {
    try {
        // Simulasikan upload file
        const newMaterial = {
            id: (materials.length + 1).toString(),
            title: req.body.title,
            description: req.body.description,
            fileName: req.body.title.replace(/\s+/g, '-').toLowerCase() + '.pdf',
            filePath: '/dummy/' + req.body.title.replace(/\s+/g, '-').toLowerCase() + '.pdf',
            fileType: 'application/pdf',
            fileSize: Math.floor(Math.random() * 5 * 1024 * 1024) + (0.5 * 1024 * 1024), // 0.5-5.5 MB
            downloads: 0,
            createdAt: new Date(),
            uploadedBy: req.user.id
        };

        materials.push(newMaterial);
        
        res.redirect('/admin/material');
    } catch (error) {
        console.error('Error adding material:', error);
        res.status(500).render('admin/material/add', {
            error: 'Terjadi kesalahan saat menambahkan materi',
            title: 'Tambah Materi Baru',
            user: req.user,
            formData: req.body
        });
    }
};

exports.deleteMaterial = async (req, res) => {
    try {
        const materialId = req.params.id;
        const index = materials.findIndex(m => m.id === materialId);
        
        if (index === -1) {
            return res.status(404).render('error', { message: 'Materi tidak ditemukan' });
        }

        // Hapus materi dari array
        materials.splice(index, 1);
        
        res.redirect('/admin/material');
    } catch (error) {
        console.error('Error deleting material:', error);
        res.status(500).render('error', { 
            message: 'Terjadi kesalahan saat menghapus materi' 
        });
    }
};