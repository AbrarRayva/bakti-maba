// controllers/materialController.js

// Simpan data materi dalam array (sementara)
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
        
        res.render('user/material/index', {
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

exports.downloadMaterial = async (req, res) => {
    try {
        const materialId = req.params.id;
        const material = materials.find(m => m.id === materialId);
        
        if (!material) {
            return res.status(404).render('error', { message: 'Materi tidak ditemukan' });
        }
        
        // Update jumlah download
        material.downloads++;
        
        // Simulasikan download file
        res.setHeader('Content-Type', material.fileType);
        res.setHeader('Content-Disposition', `attachment; filename="${material.fileName}"`);
        
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
                    <p class="text-gray-600 mb-6">File <span class="font-medium">${material.fileName}</span> telah berhasil diunduh.</p>
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