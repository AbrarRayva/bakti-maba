const { tugasList, nilaiList } = require('../data/dataStore');

// Tampilkan daftar tugas yang bisa dinilai
exports.list = (req, res) => {
  res.render('panitia/nilai', { tugas: tugasList });
};

// Form penilaian
exports.formNilai = (req, res) => {
  const tugas = tugasList.find(t => t.id == req.params.id);
  if (!tugas) return res.send('Tugas tidak ditemukan.');
  res.render('panitia/beriNilai', { tugas });
};

// Simpan nilai
exports.submitNilai = (req, res) => {
  const tugas = tugasList.find(t => t.id == req.params.id);
  if (!tugas) return res.send('Tugas tidak ditemukan.');

  const nilaiData = {
    tugas_id: tugas.id,
    nama_peserta: tugas.nama_peserta,
    nilai: Number(req.body.nilai),
    komentar: req.body.komentar,
    waktu_nilai: new Date()
  };

  // Cek apakah sudah ada nilai sebelumnya
  const existingIndex = nilaiList.findIndex(n => n.tugas_id === tugas.id);
  if (existingIndex !== -1) {
    nilaiList[existingIndex] = nilaiData;
  } else {
    nilaiList.push(nilaiData);
  }

  // Redirect ke halaman rekap
  res.redirect('/rekap');
};
