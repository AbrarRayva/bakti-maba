// controllers/materialController.js

const db = require('../models');

exports.viewMaterials = async (req, res) => {
    try {
        const materials = await db.Materi.findAll({
            order: [['createdAt', 'DESC']]
        });
        
        res.render('user/material/index', {
            title: 'Materi',
            user: req.user,
            materials: materials
        });
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).render('error', { 
            message: 'Terjadi kesalahan saat mengambil data materi' 
        });
    }
};

exports.downloadMaterial = async (req, res) => {
    try {
        const materialId = req.params.id;
        const material = await db.Materi.findByPk(materialId);
        
        if (!material) {
            return res.status(404).render('error', { message: 'Materi tidak ditemukan' });
        }
        
        // Update jumlah download
        await material.update({
            jumlah_download: (material.jumlah_download || 0) + 1
        });
        
        // Simulasikan download file
        res.setHeader('Content-Type', material.tipe_file || 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${material.nama_file}"`);
        
        // Untuk simulasi, kirimkan pesan sukses
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Download Simulasi</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="bg-gray-100 min-h-screen flex items-center justify-center">
                <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-green-600 text-2xl"></i>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Download Berhasil</h2>
                    <p class="text-gray-600 mb-6">File <span class="font-medium">${material.nama_file}</span> telah berhasil diunduh.</p>
                    <p class="text-sm text-gray-500 mb-6">(Dalam implementasi nyata, file akan dikirimkan)</p>
                    <a href="/material" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg inline-block">
                        <i class="fas fa-arrow-left mr-2"></i> Kembali ke Materi
                    </a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error downloading material:', error);
        res.status(500).render('error', { 
            message: 'Terjadi kesalahan saat mengunduh materi' 
        });
    }
};