const { nilaiList } = require('../data/dataStore');

exports.showRekap = (req, res) => {
  // Map peserta → list nilai mereka
  const pesertaMap = {};

  nilaiList.forEach(n => {
    if (!pesertaMap[n.nama_peserta]) {
      pesertaMap[n.nama_peserta] = [];
    }
    pesertaMap[n.nama_peserta].push(n.nilai);
  });

  const rekap = Object.entries(pesertaMap).map(([nama, nilaiArray]) => {
    const total = nilaiArray.reduce((a, b) => a + b, 0);
    const rataRata = (total / nilaiArray.length).toFixed(2);
    return {
      nama,
      jumlahTugas: nilaiArray.length,
      rataRata
    };
  });

  res.render('panitia/rekap', { nilai: nilaiList });
};
