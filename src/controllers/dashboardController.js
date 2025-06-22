const { JadwalKegiatan, Lokasi, Kelompok, User } = require('../models');
const { Op } = require('sequelize');

const dashboardController = {
    index: async (req, res) => {
        try {
            // Hitung statistik untuk user dashboard
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            // Jadwal hari ini
            const jadwalHariIni = await JadwalKegiatan.count({
                where: {
                    tanggal: today.toISOString().split('T')[0]
                }
            });

            // Jadwal minggu ini
            const jadwalMingguIni = await JadwalKegiatan.count({
                where: {
                    tanggal: {
                        [Op.between]: [startOfWeek.toISOString().split('T')[0], endOfWeek.toISOString().split('T')[0]]
                    }
                }
            });

            // Total jadwal
            const totalJadwal = await JadwalKegiatan.count();

            res.render('dashboard/dashboard', {
                title: 'Dashboard',
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
            // Hitung statistik untuk admin dashboard
            const totalJadwal = await JadwalKegiatan.count();
            const totalLokasi = await Lokasi.count();
            const totalKelompok = await Kelompok.count();
            const totalUsers = await User.count();

            res.render('admin/dashboard', {
                title: 'Admin Dashboard',
                stats: {
                    totalJadwal,
                    totalLokasi,
                    totalKelompok,
                    totalUsers
                }
            });
        } catch (error) {
            console.error('Error loading admin dashboard:', error);
            res.render('admin/dashboard', {
                title: 'Admin Dashboard',
                stats: {
                    totalJadwal: 0,
                    totalLokasi: 0,
                    totalKelompok: 0,
                    totalUsers: 0
                }
            });
        }
    }
};

module.exports = dashboardController; 