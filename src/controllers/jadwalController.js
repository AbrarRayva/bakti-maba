const { JadwalKegiatan, Lokasi, Kelompok } = require('../models');

// Menampilkan halaman jadwal untuk peserta
const index = async (req, res) => {
  try {
    const { tanggal, kelompok, lokasi } = req.query;
    
    let whereClause = {};
    let includeClause = [
      {
        model: Lokasi,
        as: 'Lokasi',
        attributes: ['nama_lokasi']
      },
      {
        model: Kelompok,
        as: 'Kelompoks',
        through: { attributes: [] },
        attributes: ['nama_kelompok']
      }
    ];

    // Filter berdasarkan tanggal
    if (tanggal) {
      whereClause.tanggal = tanggal;
    }

    // Filter berdasarkan kelompok
    if (kelompok) {
      includeClause[1].where = { id_kelompok: kelompok };
    }

    // Filter berdasarkan lokasi
    if (lokasi) {
      whereClause.id_lokasi = lokasi;
    }

    const jadwal = await JadwalKegiatan.findAll({
      where: whereClause,
      include: includeClause,
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });

    // Ambil data untuk filter
    const lokasiList = await Lokasi.findAll();
    const kelompokList = await Kelompok.findAll();

    res.render('jadwal/jadwal', {
      jadwal,
      lokasiList,
      kelompokList,
      filters: { tanggal, kelompok, lokasi }
    });
  } catch (error) {
    console.error('Error fetching jadwal:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil data jadwal');
  }
};

// Menampilkan detail jadwal
const show = async (req, res) => {
  try {
    const { id } = req.params;
    
    const jadwal = await JadwalKegiatan.findByPk(id, {
      include: [
        {
          model: Lokasi,
          as: 'Lokasi',
          attributes: ['nama_lokasi', 'alamat']
        },
        {
          model: Kelompok,
          as: 'Kelompoks',
          through: { attributes: [] },
          attributes: ['nama_kelompok']
        }
      ]
    });

    if (!jadwal) {
      return res.status(404).send('Jadwal tidak ditemukan');
    }

    res.render('jadwal/detail', { jadwal });
  } catch (error) {
    console.error('Error fetching jadwal detail:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil detail jadwal');
  }
};

// Menampilkan halaman admin jadwal
const adminIndex = async (req, res) => {
  try {
    const jadwal = await JadwalKegiatan.findAll({
      include: [
        {
          model: Lokasi,
          as: 'Lokasi',
          attributes: ['nama_lokasi']
        },
        {
          model: Kelompok,
          as: 'Kelompoks',
          through: { attributes: [] },
          attributes: ['nama_kelompok']
        }
      ],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });

    // Ambil data untuk statistik
    const lokasiList = await Lokasi.findAll();
    const kelompokList = await Kelompok.findAll();

    res.render('admin/jadwal/jadwal', { 
      jadwal, 
      lokasiList, 
      kelompokList 
    });
  } catch (error) {
    console.error('Error fetching jadwal:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil data jadwal');
  }
};

// Menampilkan form create jadwal
const create = async (req, res) => {
  try {
    const lokasiList = await Lokasi.findAll();
    const kelompokList = await Kelompok.findAll();
    
    res.render('admin/jadwal/create', { lokasiList, kelompokList });
  } catch (error) {
    console.error('Error loading create form:', error);
    res.status(500).send('Terjadi kesalahan saat memuat form');
  }
};

// Menyimpan jadwal baru
const store = async (req, res) => {
  try {
    const { nama_kegiatan, deskripsi, tanggal, waktu_mulai, id_lokasi, kelompok_ids } = req.body;

    const jadwal = await JadwalKegiatan.create({
      nama_kegiatan,
      deskripsi,
      tanggal,
      waktu_mulai,
      id_lokasi
    });

    // Tambahkan asosiasi dengan kelompok
    if (kelompok_ids && kelompok_ids.length > 0) {
      await jadwal.setKelompoks(kelompok_ids);
    }

    res.redirect('/admin/jadwal');
  } catch (error) {
    console.error('Error creating jadwal:', error);
    res.status(500).send('Terjadi kesalahan saat menyimpan jadwal');
  }
};

// Menampilkan form edit jadwal
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    
    const jadwal = await JadwalKegiatan.findByPk(id, {
      include: [
        {
          model: Kelompok,
          as: 'Kelompoks',
          through: { attributes: [] },
          attributes: ['id_kelompok']
        }
      ]
    });

    if (!jadwal) {
      return res.status(404).send('Jadwal tidak ditemukan');
    }

    const lokasiList = await Lokasi.findAll();
    const kelompokList = await Kelompok.findAll();
    
    // Ambil ID kelompok yang sudah terpilih
    const selectedKelompokIds = jadwal.Kelompoks.map(k => k.id_kelompok);

    res.render('admin/jadwal/edit', { 
      jadwal, 
      lokasiList, 
      kelompokList,
      selectedKelompokIds 
    });
  } catch (error) {
    console.error('Error loading edit form:', error);
    res.status(500).send('Terjadi kesalahan saat memuat form');
  }
};

// Update jadwal
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kegiatan, deskripsi, tanggal, waktu_mulai, id_lokasi, kelompok_ids } = req.body;

    const jadwal = await JadwalKegiatan.findByPk(id);
    if (!jadwal) {
      return res.status(404).send('Jadwal tidak ditemukan');
    }

    await jadwal.update({
      nama_kegiatan,
      deskripsi,
      tanggal,
      waktu_mulai,
      id_lokasi
    });

    // Update asosiasi dengan kelompok
    if (kelompok_ids && kelompok_ids.length > 0) {
      await jadwal.setKelompoks(kelompok_ids);
    } else {
      await jadwal.setKelompoks([]);
    }

    res.redirect('/admin/jadwal');
  } catch (error) {
    console.error('Error updating jadwal:', error);
    res.status(500).send('Terjadi kesalahan saat mengupdate jadwal');
  }
};

// Hapus jadwal
const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    
    const jadwal = await JadwalKegiatan.findByPk(id);
    if (!jadwal) {
      return res.status(404).send('Jadwal tidak ditemukan');
    }

    await jadwal.destroy();
    res.status(200).send('Jadwal berhasil dihapus');
  } catch (error) {
    console.error('Error deleting jadwal:', error);
    res.status(500).send('Terjadi kesalahan saat menghapus jadwal');
  }
};

// Export calendar
const exportCalendar = async (req, res) => {
  try {
    const jadwal = await JadwalKegiatan.findAll({
      include: [
        {
          model: Lokasi,
          as: 'Lokasi',
          attributes: ['nama_lokasi']
        }
      ],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });

    // Format data untuk calendar
    const calendarData = jadwal.map(item => ({
      title: item.nama_kegiatan,
      start: `${item.tanggal}T${item.waktu_mulai}:00`,
      location: item.Lokasi ? item.Lokasi.nama_lokasi : 'Lokasi belum ditentukan',
      description: item.deskripsi || ''
    }));

    res.json(calendarData);
  } catch (error) {
    console.error('Error exporting calendar:', error);
    res.status(500).send('Terjadi kesalahan saat export calendar');
  }
};

module.exports = {
  index,
  show,
  adminIndex,
  create,
  store,
  edit,
  update,
  destroy,
  exportCalendar
}; 