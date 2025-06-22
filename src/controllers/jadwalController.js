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

    res.render('jadwal/index', {
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

    res.render('admin/jadwal/index', { jadwal });
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
    res.redirect('/admin/jadwal');
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

    let icsContent = 'BEGIN:VCALENDAR\r\n';
    icsContent += 'VERSION:2.0\r\n';
    icsContent += 'PRODID:-//Bakti Maba//Jadwal Kegiatan//ID\r\n';

    jadwal.forEach(item => {
      const startDate = new Date(`${item.tanggal}T${item.waktu_mulai}`);
      const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Default 2 jam

      icsContent += 'BEGIN:VEVENT\r\n';
      icsContent += `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\n`;
      icsContent += `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\n`;
      icsContent += `SUMMARY:${item.nama_kegiatan}\r\n`;
      icsContent += `DESCRIPTION:${item.deskripsi || ''}\r\n`;
      icsContent += `LOCATION:${item.Lokasi ? item.Lokasi.nama_lokasi : ''}\r\n`;
      icsContent += 'END:VEVENT\r\n';
    });

    icsContent += 'END:VCALENDAR\r\n';

    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="jadwal-kegiatan.ics"');
    res.send(icsContent);
  } catch (error) {
    console.error('Error exporting calendar:', error);
    res.status(500).send('Terjadi kesalahan saat export calendar');
  }
};

module.exports = {
  index,
  adminIndex,
  create,
  store,
  edit,
  update,
  destroy,
  exportCalendar
}; 