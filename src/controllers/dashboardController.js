const { JadwalKegiatan, Lokasi, Kelompok, User } = require('../models');
const { Op } = require('sequelize');

const dashboardController = {
    index: async (req, res) => {
        try {
            // Get user from session
            const user = req.session.user;
            if (!user) {
                return res.redirect('/login');
            }

            // Hitung statistik untuk user dashboard
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            // Get user's kelompok
            const userData = await User.findByPk(user.nim, {
                include: [
                    {
                        model: Kelompok,
                        as: 'Kelompok',
                        attributes: ['id_kelompok', 'nama_kelompok']
                    }
                ]
            });

            let jadwalQuery = {
                where: {
                    tanggal: today.toISOString().split('T')[0]
                },
                include: [
                    {
                        model: Lokasi,
                        as: 'Lokasi',
                        attributes: ['nama_lokasi']
                    }
                ]
            };

            // If user has kelompok, filter by kelompok
            if (userData && userData.Kelompok) {
                jadwalQuery.include.push({
                    model: Kelompok,
                    as: 'Kelompoks',
                    where: { id_kelompok: userData.Kelompok.id_kelompok },
                    through: { attributes: [] },
                    attributes: ['nama_kelompok']
                });
            }

            // Jadwal hari ini
            const jadwalHariIni = await JadwalKegiatan.count(jadwalQuery);

            // Jadwal minggu ini
            const jadwalMingguQuery = {
                where: {
                    tanggal: {
                        [Op.between]: [startOfWeek.toISOString().split('T')[0], endOfWeek.toISOString().split('T')[0]]
                    }
                },
                include: [
                    {
                        model: Lokasi,
                        as: 'Lokasi',
                        attributes: ['nama_lokasi']
                    }
                ]
            };

            if (userData && userData.Kelompok) {
                jadwalMingguQuery.include.push({
                    model: Kelompok,
                    as: 'Kelompoks',
                    where: { id_kelompok: userData.Kelompok.id_kelompok },
                    through: { attributes: [] },
                    attributes: ['nama_kelompok']
                });
            }

            const jadwalMingguIni = await JadwalKegiatan.count(jadwalMingguQuery);

            // Total jadwal untuk user
            let totalJadwalQuery = {
                include: [
                    {
                        model: Lokasi,
                        as: 'Lokasi',
                        attributes: ['nama_lokasi']
                    }
                ]
            };

            if (userData && userData.Kelompok) {
                totalJadwalQuery.include.push({
                    model: Kelompok,
                    as: 'Kelompoks',
                    where: { id_kelompok: userData.Kelompok.id_kelompok },
                    through: { attributes: [] },
                    attributes: ['nama_kelompok']
                });
            }

            const totalJadwal = await JadwalKegiatan.count(totalJadwalQuery);

            res.render('dashboard/dashboard', {
                title: 'Dashboard',
                user: userData,
                stats: {
                    jadwalHariIni,
                    jadwalMingguIni,
                    totalJadwal,
                    notifikasi: 0
                }
            });
        } catch (error) {
            console.error('Error loading dashboard:', error);
            res.render('dashboard/dashboard', {
                title: 'Dashboard',
                user: null,
                stats: {
                    jadwalHariIni: 0,
                    jadwalMingguIni: 0,
                    totalJadwal: 0,
                    notifikasi: 0
                }
            });
        }
    },
    
    adminDashboard: async (req, res) => {
        try {
            // Get user from session
            const user = req.session.user;
            if (!user || user.role !== 'admin') {
                return res.redirect('/login');
            }

            // Hitung statistik untuk admin dashboard
            const totalJadwal = await JadwalKegiatan.count();
            const totalLokasi = await Lokasi.count();
            const totalKelompok = await Kelompok.count();
            const totalUsers = await User.count();
            const blockedUsers = await User.count({ where: { is_blocked: true } });
            const activeUsers = totalUsers - blockedUsers;

            res.render('admin/dashboard', {
                title: 'Admin Dashboard',
                user,
                stats: {
                    totalJadwal,
                    totalLokasi,
                    totalKelompok,
                    totalUsers,
                    activeUsers,
                    blockedUsers
                }
            });
        } catch (error) {
            console.error('Error loading admin dashboard:', error);
            res.render('admin/dashboard', {
                title: 'Admin Dashboard',
                user: null,
                stats: {
                    totalJadwal: 0,
                    totalLokasi: 0,
                    totalKelompok: 0,
                    totalUsers: 0,
                    activeUsers: 0,
                    blockedUsers: 0
                }
            });
        }
    }
};

module.exports = dashboardController; 