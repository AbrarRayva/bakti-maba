// controllers/materialController.js

const { Materi } = require('../models');
const path = require('path');

exports.viewMaterials = async (req, res) => {
    try {
        const materials = await Materi.findAll({
            order: [['createdAt', 'DESC']]
        });
        
        res.render('user/material/index', {
            layout: 'layouts/main',
            title: 'Materi Pembelajaran',
            materials
        });
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).render('error', { 
            layout: 'layouts/main',
            title: 'Error',
            message: 'Terjadi kesalahan saat mengambil data materi.'
        });
    }
};

exports.downloadMaterial = async (req, res) => {
    try {
        const material = await Materi.findByPk(req.params.id);
        
        if (!material || !material.file_path) {
            return res.status(404).render('error', { 
                layout: 'layouts/main',
                title: 'Error',
                message: 'Materi tidak ditemukan atau file tidak tersedia.'
            });
        }
        
        const filePath = path.join(__dirname, '../../public', material.file_path);
        res.download(filePath, `Materi - ${path.basename(material.file_path)}`, (err) => {
            if (err) {
                console.error('Error during file download:', err);
                if (!res.headersSent) {
                    res.status(500).send('Gagal mengunduh file.');
                }
            }
        });
    } catch (error) {
        console.error('Error processing download:', error);
        res.status(500).render('error', {
            layout: 'layouts/main',
            title: 'Error',
            message: 'Terjadi kesalahan saat memproses unduhan.'
        });
    }
};