const db = require('../models');

exports.getMap = async (req, res) => {
  try {
    const sortOrder = req.query.sort === 'newest' 
      ? [['createdAt', 'DESC']] 
      : [['waktu_mulai', 'ASC']];

    const activities = await db.JadwalKegiatan.findAll({
      include: [{ model: db.Lokasi, as: 'Lokasi' }],
      order: sortOrder
    });

    // Transform data to match view expectations
    const transformedActivities = activities.map(activity => ({
      id: activity.id_kegiatan,
      title: activity.nama_kegiatan,
      waktu: activity.waktu_mulai, // Pass the original time for sorting
      waktu_formatted: `${activity.tanggal} ${activity.waktu_mulai}`,
      coords: {
        x: activity.Lokasi ? activity.Lokasi.koordinat_x : null,
        y: activity.Lokasi ? activity.Lokasi.koordinat_y : null
      }
    }));

    res.render('user/campus/index', { 
      activities: transformedActivities,
      currentSort: req.query.sort || 'nearest'
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data kegiatan' });
  }
};