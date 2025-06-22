const db = require('../models');

exports.getMap = async (req, res) => {
  try {
    const activities = await db.JadwalKegiatan.findAll({
      where: { status: 'aktif' },
      include: [{ model: db.Lokasi, as: 'Lokasi' }],
      order: [['waktu_mulai', 'ASC']]
    });
    res.render('user/campus/index', { activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data kegiatan' });
  }
};