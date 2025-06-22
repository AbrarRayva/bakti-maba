const { tugasList, nilaiList, sertifikatList } = require('../data/dataStore');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Helper function for error responses
const sendError = (res, status, message) => {
  console.error(message);
  return res.status(status).send(message);
};

// Halaman panitia: menampilkan peserta yang sudah bisa dikirim sertifikat
exports.listSiapSertifikat = (req, res) => {
  try {
    const tugasTerisi = {};
    
    tugasList.forEach(tugas => {
      tugasTerisi[tugas.nama_peserta] = (tugasTerisi[tugas.nama_peserta] || 0) + 1;
    });

    const pesertaYangSiap = Object.entries(tugasTerisi)
      .filter(([_, jumlahTugas]) => jumlahTugas >= 3)
      .map(([nama]) => nama);

    res.render('panitia/sertifikat', {
      pesertaSiap: pesertaYangSiap,
      sertifikatList,
      status: req.query.status,
      error: req.query.error
    });
  } catch (err) {
    sendError(res, 500, 'Terjadi kesalahan server');
  }
};

// Kirim sertifikat dengan file upload
exports.kirimSertifikat = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).redirect('/sertifikat?error=File sertifikat belum dipilih');
    }

    const { nama } = req.body;
    
    if (!nama) {
      return res.status(400).redirect('/sertifikat?error=Nama peserta harus diisi');
    }

    const sudahAda = sertifikatList.find(s => s.nama === nama);
    if (sudahAda) {
      return res.status(400).redirect(`/sertifikat?error=Sertifikat untuk ${nama} sudah pernah dikirim`);
    }

    sertifikatList.push({
      nama,
      filename: req.file.filename,
      originalName: req.file.originalname,
      waktu: new Date(),
      path: req.file.path
    });

    return res.redirect('/sertifikat/peserta?status=success');
  } catch (err) {
    if (err instanceof multer.MulterError) {
      return res.redirect(`/sertifikat?error=${err.message}`);
    }
    return res.redirect('/sertifikat?error=Terjadi kesalahan sistem');
  }
};

// Halaman peserta melihat daftar sertifikat yang sudah dikirim
exports.daftarPesertaSertifikat = (req, res) => {
  try {
    res.render('mahasiswa/daftarSertifikat', { 
      peserta: sertifikatList 
    });
  } catch (err) {
    sendError(res, 500, 'Terjadi kesalahan server');
  }
};

// Detail sertifikat untuk peserta tertentu
exports.lihatSertifikat = (req, res) => {
  try {
    const nama = req.params.nama;
    const data = sertifikatList.find(s => s.nama === nama);
    
    if (!data) {
      return sendError(res, 404, 'Sertifikat belum dikirim untuk peserta ini');
    }
    
    res.render('mahasiswa/detailSertifikat', {
      nama: data.nama,
      filename: data.filename,
      originalName: data.originalName,
      waktu: data.waktu.toLocaleString(),
      downloadUrl: `/sertifikat/download/${data.filename}?original=${encodeURIComponent(data.originalName)}`
    });
  } catch (err) {
    sendError(res, 500, 'Terjadi kesalahan server');
  }
};

// Download sertifikat
exports.downloadSertifikat = (req, res) => {
  try {
    const filename = req.params.filename;
    const originalName = req.query.original || filename;
    const filePath = path.join(__dirname, '../uploads/sertifikat', filename);
    
    if (!fs.existsSync(filePath)) {
      return sendError(res, 404, 'File sertifikat tidak ditemukan');
    }

    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
    
    const ext = path.extname(filename).toLowerCase();
    const contentType = {
      '.pdf': 'application/pdf',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png'
    }[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
    
  } catch (err) {
    sendError(res, 500, 'Terjadi kesalahan server');
  }
};