const db = require('../models');

exports.getMap = async (req, res) => {
  try {
    const activities = await db.JadwalKegiatan.findAll({
      include: [{ model: db.Lokasi, as: 'Lokasi' }],
      order: [['waktu_mulai', 'ASC']]
    });
    res.render('admin/campus/index', { activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data kegiatan' });
  }
};

exports.showForm = (req, res) => {
  const { x, y } = req.query;
  res.render('admin/campus/form', { x: x || '', y: y || '' });
};

exports.addActivity = async (req, res) => {
  try {
    const { judul, deskripsi, waktu_mulai, waktu_selesai, id_lokasi } = req.body;
    
    await db.JadwalKegiatan.create({
      judul,
      deskripsi,
      waktu_mulai: new Date(waktu_mulai),
      waktu_selesai: new Date(waktu_selesai),
      id_lokasi: id_lokasi || null,
      status: 'aktif'
    });
    
    res.redirect('/admin/campus');
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat membuat kegiatan' });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const activity = await db.JadwalKegiatan.findByPk(id);
    
    if (activity) {
      await activity.destroy();
    }
    
    res.redirect('/admin/campus');
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat menghapus kegiatan' });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const activity = await db.JadwalKegiatan.findByPk(id, {
      include: [{ model: db.Lokasi, as: 'Lokasi' }]
    });
    
    if (!activity) return res.redirect('/admin/campus');
    
    res.render('admin/campus/edit', { activity });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengambil data kegiatan' });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { judul, deskripsi, waktu_mulai, waktu_selesai, id_lokasi } = req.body;
    
    const activity = await db.JadwalKegiatan.findByPk(id);
    if (activity) {
      await activity.update({
        judul,
        deskripsi,
        waktu_mulai: new Date(waktu_mulai),
        waktu_selesai: new Date(waktu_selesai),
        id_lokasi: id_lokasi || null
      });
    }
    
    res.redirect('/admin/campus');
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).render('error', { message: 'Terjadi kesalahan saat mengupdate kegiatan' });
  }
};