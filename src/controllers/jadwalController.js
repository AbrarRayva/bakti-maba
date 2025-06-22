const { JadwalKegiatan, Lokasi } = require('../models');
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
    
    // Filter berdasarkan kelompok/jurusan
    if (kelompok) {
      whereClause.kelompok = kelompok;
    }
    
    let lokasiWhere = {};
    if (lokasi) {
      lokasiWhere.nama_lokasi = { [Op.like]: `%${lokasi}%` };
    }
    
    const jadwal = await JadwalKegiatan.findAll({
      where: whereClause,
      include: [{
        model: Lokasi,
        where: lokasiWhere,
        attributes: ['nama_lokasi', 'alamat']
      }],
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
      where: { kelompok },
      include: [{
        model: Lokasi,
        attributes: ['nama_lokasi', 'alamat']
      }],
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
      include: [{
        model: Lokasi,
        attributes: ['nama_lokasi', 'alamat']
      }],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    res.render('jadwal/index', { jadwal });
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
      include: [{
        model: Lokasi,
        attributes: ['nama_lokasi', 'alamat']
      }],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    const lokasi = await Lokasi.findAll();
    
    res.render('admin/jadwal/index', { jadwal, lokasi });
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
    res.render('admin/jadwal/create', { lokasi });
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
      include: [{
        model: Lokasi,
        attributes: ['nama_lokasi', 'alamat']
      }]
    });
    
    if (!jadwal) {
      return res.status(404).render('error', { 
        message: 'Jadwal tidak ditemukan'
      });
    }
    
    const lokasi = await Lokasi.findAll();
    res.render('admin/jadwal/edit', { jadwal, lokasi });
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
      kelompok, 
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
      kelompok,
      jenis_kegiatan,
      topik
    });
    
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
      kelompok, 
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
      kelompok,
      jenis_kegiatan,
      topik
    });
    
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
    
    let whereClause = {};
    if (kelompok) {
      whereClause.kelompok = kelompok;
    }
    
    const jadwal = await JadwalKegiatan.findAll({
      where: whereClause,
      include: [{
        model: Lokasi,
        attributes: ['nama_lokasi', 'alamat']
      }],
      order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
    });
    
    let icalContent = 'BEGIN:VCALENDAR\r\n';
    icalContent += 'VERSION:2.0\r\n';
    icalContent += 'PRODID:-//Bakti Maba//Jadwal Kegiatan//ID\r\n';
    icalContent += 'CALSCALE:GREGORIAN\r\n';
    icalContent += 'METHOD:PUBLISH\r\n';
    
    jadwal.forEach(item => {
      const startDate = new Date(`${item.tanggal}T${item.waktu_mulai}`);
      const endDate = item.waktu_selesai ? new Date(`${item.tanggal}T${item.waktu_selesai}`) : new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 jam
      
      icalContent += 'BEGIN:VEVENT\r\n';
      icalContent += `UID:${item.id_kegiatan}@baktimaba.com\r\n`;
      icalContent += `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\n`;
      icalContent += `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\n`;
      icalContent += `SUMMARY:${item.nama_kegiatan}\r\n`;
      icalContent += `DESCRIPTION:${item.deskripsi || ''}\r\n`;
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
      include: [{
        model: Lokasi,
        attributes: ['nama_lokasi', 'alamat']
      }]
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