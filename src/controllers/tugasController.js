const path = require('path');
const fs = require('fs');
const { tugasList } = require('../data/dataStore');

// Menampilkan halaman tugas dengan tab
exports.viewMahasiswa = (req, res) => {
  const tab = req.query.tab || 'ongoing';
  
  // Filter tugas berdasarkan tab
  const filteredTugas = tugasList.filter(tugas => {
    if (tab === 'completed') {
      return tugas.versi === 'origin'; // Hanya tampilkan versi origin di completed
    }
    return true; // Tampilkan semua di ongoing
  });

  res.render('mahasiswa/tugas', { 
    tugas: filteredTugas,
    currentTab: tab
  });
};

// Upload tugas pertama (versi origin)
exports.upload = (req, res) => {
  const { nama_peserta } = req.body;
  const file = req.file;
  if (!file) return res.send('File belum dipilih.');

  const tugas = {
    id: Date.now(),
    nama_peserta,
    filename: file.filename,
    versi: 'origin',
    createdAt: new Date(),
    status: 'completed' // Tugas baru langsung masuk completed
  };
  
  tugasList.push(tugas);
  res.redirect('/mahasiswa/tugas?tab=completed');
};

// Upload revisi tugas
exports.uploadRevisi = (req, res) => {
  const { nama_peserta, tugas_id } = req.body;
  const file = req.file;
  if (!file) return res.send('File belum dipilih.');

  // Cari tugas asli
  const tugasAsli = tugasList.find(t => t.id == tugas_id);
  if (!tugasAsli) return res.send('Tugas asli tidak ditemukan.');

  const revisiTugas = {
    id: Date.now(),
    nama_peserta,
    filename: file.filename,
    versi: 'revisi',
    tugasAsliId: tugas_id, // Simpan referensi ke tugas asli
    createdAt: new Date(),
    status: 'completed'
  };

  tugasList.push(revisiTugas);
  res.redirect('/mahasiswa/tugas?tab=completed');
};

// Halaman panitia melihat daftar tugas
exports.viewPanitia = (req, res) => {
  res.render('panitia/tugas', { tugas: tugasList });
};

// Download file tugas
exports.download = (req, res) => {
  const tugas = tugasList.find(t => t.id == req.params.id);
  if (!tugas) return res.send('Tugas tidak ditemukan.');
  const filePath = path.join(__dirname, '../uploads', tugas.filename);
  res.download(filePath);
};