const { User, Kelompok } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// Menampilkan halaman manajemen user untuk admin
const index = async (req, res) => {
  try {
    const { search_nama, search_nim, kelompok, role, status } = req.query;
    
    let whereClause = {};
    let includeClause = [
      {
        model: Kelompok,
        as: 'Kelompok',
        attributes: ['nama_kelompok']
      }
    ];

    // Filter berdasarkan search nama
    if (search_nama) {
      whereClause.nama = { [Op.iLike]: `%${search_nama}%` };
    }

    // Filter berdasarkan search NIM
    if (search_nim) {
      whereClause.nim = { [Op.iLike]: `%${search_nim}%` };
    }

    // Filter berdasarkan kelompok
    if (kelompok) {
      whereClause.id_kelompok = kelompok;
    }

    // Filter berdasarkan role
    if (role) {
      whereClause.role = role;
    }

    // Filter berdasarkan status (blocked/unblocked)
    if (status) {
      whereClause.is_blocked = status === 'blocked';
    }

    const users = await User.findAll({
      where: whereClause,
      include: includeClause,
      order: [['nama', 'ASC']]
    });

    // Ambil data untuk filter
    const kelompokList = await Kelompok.findAll();

    res.render('admin/users/users', {
      users,
      kelompokList,
      filters: { search_nama, search_nim, kelompok, role, status }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil data user');
  }
};

// Menampilkan form create user
const create = async (req, res) => {
  try {
    const kelompokList = await Kelompok.findAll();
    
    res.render('admin/users/create', { kelompokList });
  } catch (error) {
    console.error('Error loading create form:', error);
    res.status(500).send('Terjadi kesalahan saat memuat form');
  }
};

// Menyimpan user baru
const store = async (req, res) => {
  try {
    const { nama, nim, password, id_kelompok, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      nama,
      nim,
      password: hashedPassword,
      id_kelompok: id_kelompok || null,
      role: role || 'peserta',
      is_blocked: false,
      total_poin: 0
    });

    res.redirect('/admin/users');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Terjadi kesalahan saat menyimpan user');
  }
};

// Menampilkan form edit user
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      include: [
        {
          model: Kelompok,
          as: 'Kelompok',
          attributes: ['nama_kelompok']
        }
      ]
    });

    if (!user) {
      return res.status(404).send('User tidak ditemukan');
    }

    const kelompokList = await Kelompok.findAll();

    res.render('admin/users/edit', { 
      user, 
      kelompokList 
    });
  } catch (error) {
    console.error('Error loading edit form:', error);
    res.status(500).send('Terjadi kesalahan saat memuat form');
  }
};

// Update user
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nim, password, id_kelompok, role, is_blocked } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User tidak ditemukan');
    }

    const updateData = {
      nama,
      nim,
      id_kelompok: id_kelompok || null,
      role,
      is_blocked: is_blocked === 'true'
    };

    // Update password jika diisi
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updateData);

    res.redirect('/admin/users');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Terjadi kesalahan saat mengupdate user');
  }
};

// Delete user
const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    await user.destroy();
    res.json({ success: true, message: 'User berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat menghapus user' });
  }
};

// Toggle block status
const toggleBlock = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User tidak ditemukan');
    }

    await user.update({ is_blocked: !user.is_blocked });
    
    res.json({ 
      success: true, 
      is_blocked: user.is_blocked,
      message: user.is_blocked ? 'User berhasil diblokir' : 'User berhasil dibuka blokir'
    });
  } catch (error) {
    console.error('Error toggling block status:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan' });
  }
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
  toggleBlock
}; 