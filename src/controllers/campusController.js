const kegiatan = [];
const buildings = [];

exports.getMap = (req, res) => {
  res.render('campus/building', { kegiatan, buildings });
};

// Form gabungan tambah kegiatan + gedung
exports.getAddCombinedForm = (req, res) => {
  res.render('campus/add');
};

exports.addCombined = (req, res) => {
  const { title, waktu, warna, name, coords } = req.body;

  // Simpan gedung
  buildings.push({ name, coords });

  // Simpan kegiatan dengan nama gedung sebagai lokasi
  kegiatan.push({
    id: kegiatan.length + 1,
    title,
    lokasi: name,
    waktu,
    warna
  });

  res.redirect('/campus');
};
