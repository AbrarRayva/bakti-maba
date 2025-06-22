const { Kelompok, User } = require('../models');
const { Op } = require('sequelize');

// Menampilkan halaman manajemen kelompok untuk admin
const index = async (req, res) => {
  try {
    const { search } = req.query;
    
    let whereClause = {};

    // Filter berdasarkan search (nama kelompok)
    if (search) {
      whereClause.nama_kelompok = { [Op.iLike]: `%${search}%` };
    }

    const kelompokList = await Kelompok.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['nim', 'nama']
        }
      ],
      order: [['nama_kelompok', 'ASC']]
    });

    res.render('admin/kelompok/index', {
      kelompokList,
      filters: { search }
    });
  } catch (error) {
    console.error('Error fetching kelompok:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil data kelompok');
  }
};

// Menampilkan form create kelompok
const create = async (req, res) => {
  try {
    res.render('admin/kelompok/create');
  } catch (error) {
    console.error('Error loading create form:', error);
    res.status(500).send('Terjadi kesalahan saat memuat form');
  }
};

// Menyimpan kelompok baru
const store = async (req, res) => {
  try {
    const { nama_kelompok } = req.body;

    await Kelompok.create({
      nama_kelompok
    });

    res.redirect('/admin/kelompok');
  } catch (error) {
    console.error('Error creating kelompok:', error);
    res.status(500).send('Terjadi kesalahan saat menyimpan kelompok');
  }
};

// Menampilkan form edit kelompok
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    
    const kelompok = await Kelompok.findByPk(id, {
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['nim', 'nama']
        }
      ]
    });

    if (!kelompok) {
      return res.status(404).send('Kelompok tidak ditemukan');
    }

    res.render('admin/kelompok/edit', { kelompok });
  } catch (error) {
    console.error('Error loading edit form:', error);
    res.status(500).send('Terjadi kesalahan saat memuat form');
  }
};

// Update kelompok
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kelompok } = req.body;

    const kelompok = await Kelompok.findByPk(id);
    if (!kelompok) {
      return res.status(404).send('Kelompok tidak ditemukan');
    }

    await kelompok.update({ nama_kelompok });

    res.redirect('/admin/kelompok');
  } catch (error) {
    console.error('Error updating kelompok:', error);
    res.status(500).send('Terjadi kesalahan saat mengupdate kelompok');
  }
};

// Delete kelompok
const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    
    const kelompok = await Kelompok.findByPk(id, {
      include: [
        {
          model: User,
          as: 'Users'
        }
      ]
    });
    
    if (!kelompok) {
      return res.status(404).json({ success: false, message: 'Kelompok tidak ditemukan' });
    }

    // Check if kelompok has users
    if (kelompok.Users && kelompok.Users.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tidak dapat menghapus kelompok yang masih memiliki anggota' 
      });
    }

    await kelompok.destroy();
    res.json({ success: true, message: 'Kelompok berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting kelompok:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat menghapus kelompok' });
  }
};

// View kelompok detail with members
const show = async (req, res) => {
  try {
    const { id } = req.params;
    
    const kelompok = await Kelompok.findByPk(id, {
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['nim', 'nama', 'role', 'is_blocked', 'total_poin']
        }
      ]
    });

    if (!kelompok) {
      return res.status(404).send('Kelompok tidak ditemukan');
    }

    res.render('admin/kelompok/show', { kelompok });
  } catch (error) {
    console.error('Error fetching kelompok detail:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil detail kelompok');
  }
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
  show
}; 