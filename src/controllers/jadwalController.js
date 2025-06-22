const { JadwalKegiatan, Lokasi, Kelompok } = require('../models');
const { Op } = require('sequelize');

// Menampilkan semua jadwal dengan filter
const getAllJadwal = async (req, res) => {
  try {
    const { tanggal, jenis_kegiatan, lokasi, kelompok } = req.query;
    
    let whereClause = {};
    
    // Filter berdasarkan tanggal
    if (tanggal) {
      whereClause.tanggal = tanggal;
    }
    
    // Filter berdasarkan jenis kegiatan
    if (jenis_kegiatan) {
      whereClause.jenis_kegiatan = jenis_kegiatan;
    }
    
    let lokasiWhere = {};
    if (lokasi) {
      lokasiWhere.nama_lokasi = { [Op.like]: `%${lokasi}%` };
    }
    
    let kelompokWhere = {};
    if (kelompok) {
      kelompokWhere.nama_kelompok = kelompok;
    }
    
    const jadwal = await JadwalKegiatan.findAll({
      where: whereClause,
      include: [
        {
          model: Lokasi,
          where: lokasiWhere,
          attributes: ['nama_lokasi', 'alamat']
        },
        {
          model: Kelompok,
          where: kelompokWhere,
          attributes: ['nama_kelompok'],
          through: { attributes: [] }
        }
      ],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    res.json({
      success: true,
      data: jadwal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data jadwal',
      error: error.message
    });
  }
};

// Menampilkan jadwal berdasarkan kelompok/jurusan
const getJadwalByKelompok = async (req, res) => {
  try {
    const { kelompok } = req.params;
    
    const jadwal = await JadwalKegiatan.findAll({
      include: [
        {
          model: Lokasi,
          attributes: ['nama_lokasi', 'alamat']
        },
        {
          model: Kelompok,
          where: { nama_kelompok: kelompok },
          attributes: ['nama_kelompok'],
          through: { attributes: [] }
        }
      ],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    res.json({
      success: true,
      data: jadwal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data jadwal',
      error: error.message
    });
  }
};

// Menampilkan halaman jadwal untuk mahasiswa
const showJadwalPage = async (req, res) => {
  try {
    const jadwal = await JadwalKegiatan.findAll({
      include: [
        {
          model: Lokasi,
          attributes: ['nama_lokasi', 'alamat']
        },
        {
          model: Kelompok,
          attributes: ['nama_kelompok'],
          through: { attributes: [] }
        }
      ],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    const kelompok = await Kelompok.findAll({
      order: [['nama_kelompok', 'ASC']]
    });
    
    res.render('jadwal/index', { jadwal, kelompok });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Terjadi kesalahan saat memuat halaman jadwal',
      error: error.message 
    });
  }
};

// Menampilkan halaman admin jadwal
const showAdminJadwalPage = async (req, res) => {
  try {
    const jadwal = await JadwalKegiatan.findAll({
      include: [
        {
          model: Lokasi,
          attributes: ['nama_lokasi', 'alamat']
        },
        {
          model: Kelompok,
          attributes: ['nama_kelompok'],
          through: { attributes: [] }
        }
      ],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    const lokasi = await Lokasi.findAll();
    const kelompok = await Kelompok.findAll({
      order: [['nama_kelompok', 'ASC']]
    });
    
    res.render('admin/jadwal/index', { jadwal, lokasi, kelompok });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Terjadi kesalahan saat memuat halaman admin jadwal',
      error: error.message 
    });
  }
};

// Menampilkan halaman create jadwal
const showCreateJadwalPage = async (req, res) => {
  try {
    const lokasi = await Lokasi.findAll();
    const kelompok = await Kelompok.findAll({
      order: [['nama_kelompok', 'ASC']]
    });
    res.render('admin/jadwal/create', { lokasi, kelompok });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Terjadi kesalahan saat memuat halaman create jadwal',
      error: error.message 
    });
  }
};

// Menampilkan halaman edit jadwal
const showEditJadwalPage = async (req, res) => {
  try {
    const { id } = req.params;
    const jadwal = await JadwalKegiatan.findByPk(id, {
      include: [
        {
          model: Lokasi,
          attributes: ['nama_lokasi', 'alamat']
        },
        {
          model: Kelompok,
          attributes: ['id_kelompok', 'nama_kelompok'],
          through: { attributes: [] }
        }
      ]
    });
    
    if (!jadwal) {
      return res.status(404).render('error', { 
        message: 'Jadwal tidak ditemukan'
      });
    }
    
    const lokasi = await Lokasi.findAll();
    const kelompok = await Kelompok.findAll({
      order: [['nama_kelompok', 'ASC']]
    });
    res.render('admin/jadwal/edit', { jadwal, lokasi, kelompok });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Terjadi kesalahan saat memuat halaman edit jadwal',
      error: error.message 
    });
  }
};

// Membuat jadwal baru
const createJadwal = async (req, res) => {
  try {
    const { 
      nama_kegiatan, 
      deskripsi, 
      tanggal, 
      waktu_mulai, 
      waktu_selesai,
      id_lokasi, 
      kelompok_ids, 
      jenis_kegiatan, 
      topik 
    } = req.body;
    
    const jadwal = await JadwalKegiatan.create({
      nama_kegiatan,
      deskripsi,
      tanggal,
      waktu_mulai,
      waktu_selesai,
      id_lokasi,
      jenis_kegiatan,
      topik
    });
    
    // Add kelompok associations
    if (kelompok_ids && kelompok_ids.length > 0) {
      await jadwal.setKelompoks(kelompok_ids);
    }
    
    res.json({
      success: true,
      message: 'Jadwal berhasil dibuat',
      data: jadwal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat jadwal',
      error: error.message
    });
  }
};

// Mengupdate jadwal
const updateJadwal = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      nama_kegiatan, 
      deskripsi, 
      tanggal, 
      waktu_mulai, 
      waktu_selesai,
      id_lokasi, 
      kelompok_ids, 
      jenis_kegiatan, 
      topik 
    } = req.body;
    
    const jadwal = await JadwalKegiatan.findByPk(id);
    
    if (!jadwal) {
      return res.status(404).json({
        success: false,
        message: 'Jadwal tidak ditemukan'
      });
    }
    
    await jadwal.update({
      nama_kegiatan,
      deskripsi,
      tanggal,
      waktu_mulai,
      waktu_selesai,
      id_lokasi,
      jenis_kegiatan,
      topik
    });
    
    // Update kelompok associations
    if (kelompok_ids && kelompok_ids.length > 0) {
      await jadwal.setKelompoks(kelompok_ids);
    } else {
      await jadwal.setKelompoks([]);
    }
    
    res.json({
      success: true,
      message: 'Jadwal berhasil diperbarui',
      data: jadwal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui jadwal',
      error: error.message
    });
  }
};

// Menghapus jadwal
const deleteJadwal = async (req, res) => {
  try {
    const { id } = req.params;
    
    const jadwal = await JadwalKegiatan.findByPk(id);
    
    if (!jadwal) {
      return res.status(404).json({
        success: false,
        message: 'Jadwal tidak ditemukan'
      });
    }
    
    await jadwal.destroy();
    
    res.json({
      success: true,
      message: 'Jadwal berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus jadwal',
      error: error.message
    });
  }
};

// Export jadwal ke format iCal
const exportJadwalToCalendar = async (req, res) => {
  try {
    const { kelompok } = req.query;
    
    let includeClause = [
      {
        model: Lokasi,
        attributes: ['nama_lokasi', 'alamat']
      }
    ];
    
    if (kelompok) {
      includeClause.push({
        model: Kelompok,
        where: { nama_kelompok: kelompok },
        attributes: ['nama_kelompok'],
        through: { attributes: [] }
      });
    } else {
      includeClause.push({
        model: Kelompok,
        attributes: ['nama_kelompok'],
        through: { attributes: [] }
      });
    }
    
    const jadwal = await JadwalKegiatan.findAll({
      include: includeClause,
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    let icalContent = 'BEGIN:VCALENDAR\r\n';
    icalContent += 'VERSION:2.0\r\n';
    icalContent += 'PRODID:-//Bakti Maba//Jadwal Kegiatan//ID\r\n';
    icalContent += 'CALSCALE:GREGORIAN\r\n';
    icalContent += 'METHOD:PUBLISH\r\n';
    
    jadwal.forEach(item => {
      const startDate = new Date(`${item.tanggal}T${item.waktu_mulai}`);
      const endDate = item.waktu_selesai ? new Date(`${item.tanggal}T${item.waktu_selesai}`) : new Date(startDate.getTime() + 60 * 60 * 1000);
      
      const kelompokNames = item.Kelompoks ? item.Kelompoks.map(k => k.nama_kelompok).join(', ') : '';
      
      icalContent += 'BEGIN:VEVENT\r\n';
      icalContent += `UID:${item.id_kegiatan}@baktimaba.com\r\n`;
      icalContent += `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\n`;
      icalContent += `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\n`;
      icalContent += `SUMMARY:${item.nama_kegiatan}\r\n`;
      icalContent += `DESCRIPTION:${item.deskripsi || ''} ${kelompokNames ? `(Kelompok: ${kelompokNames})` : ''}\r\n`;
      if (item.Lokasi) {
        icalContent += `LOCATION:${item.Lokasi.nama_lokasi}\r\n`;
      }
      icalContent += 'END:VEVENT\r\n';
    });
    
    icalContent += 'END:VCALENDAR\r\n';
    
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="jadwal-kegiatan.ics"');
    res.send(icalContent);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat export jadwal',
      error: error.message
    });
  }
};

// Mendapatkan jadwal untuk notifikasi (jadwal yang akan dimulai dalam 30 menit)
const getJadwalForNotification = async (req, res) => {
  try {
    const now = new Date();
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
    
    const jadwal = await JadwalKegiatan.findAll({
      where: {
        tanggal: now.toISOString().split('T')[0],
        waktu_mulai: {
          [Op.between]: [
            now.toTimeString().split(' ')[0],
            thirtyMinutesFromNow.toTimeString().split(' ')[0]
          ]
        }
      },
      include: [
        {
          model: Lokasi,
          attributes: ['nama_lokasi', 'alamat']
        },
        {
          model: Kelompok,
          attributes: ['nama_kelompok'],
          through: { attributes: [] }
        }
      ]
    });
    
    res.json({
      success: true,
      data: jadwal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil jadwal untuk notifikasi',
      error: error.message
    });
  }
};

module.exports = {
  getAllJadwal,
  getJadwalByKelompok,
  showJadwalPage,
  showAdminJadwalPage,
  showCreateJadwalPage,
  showEditJadwalPage,
  createJadwal,
  updateJadwal,
  deleteJadwal,
  exportJadwalToCalendar,
  getJadwalForNotification
}; 