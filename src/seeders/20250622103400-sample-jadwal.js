'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample jadwal
    const jadwalData = [
      {
        nama_kegiatan: 'Orientasi Mahasiswa Baru',
        deskripsi: 'Kegiatan orientasi untuk mahasiswa baru angkatan 2024',
        tanggal: '2024-08-15',
        waktu_mulai: '08:00:00',
        waktu_selesai: '12:00:00',
        id_lokasi: 1,
        jenis_kegiatan: 'Orientasi',
        topik: 'Pengenalan Kampus dan Sistem Akademik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Workshop Programming',
        deskripsi: 'Workshop dasar programming untuk mahasiswa teknik informatika',
        tanggal: '2024-08-20',
        waktu_mulai: '13:00:00',
        waktu_selesai: '17:00:00',
        id_lokasi: 2,
        jenis_kegiatan: 'Workshop',
        topik: 'Dasar-dasar JavaScript dan Node.js',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Seminar Kewirausahaan',
        deskripsi: 'Seminar tentang kewirausahaan dan peluang bisnis di era digital',
        tanggal: '2024-08-25',
        waktu_mulai: '09:00:00',
        waktu_selesai: '11:30:00',
        id_lokasi: 3,
        jenis_kegiatan: 'Seminar',
        topik: 'Startup dan Inovasi Digital',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Pelatihan Soft Skills',
        deskripsi: 'Pelatihan pengembangan soft skills untuk mahasiswa',
        tanggal: '2024-08-30',
        waktu_mulai: '14:00:00',
        waktu_selesai: '16:00:00',
        id_lokasi: 1,
        jenis_kegiatan: 'Pelatihan',
        topik: 'Komunikasi Efektif dan Leadership',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Diskusi Panel Teknologi',
        deskripsi: 'Diskusi panel tentang perkembangan teknologi terkini',
        tanggal: '2024-09-05',
        waktu_mulai: '19:00:00',
        waktu_selesai: '21:00:00',
        id_lokasi: 2,
        jenis_kegiatan: 'Diskusi',
        topik: 'AI dan Machine Learning',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const jadwal = await queryInterface.bulkInsert('JadwalKegiatan', jadwalData, { returning: true });

    // Insert jadwal-kelompok associations
    const jadwalKelompokData = [
      // Orientasi untuk semua kelompok
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 3, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 4, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 5, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 6, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 7, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[0].id_kegiatan, id_kelompok: 8, createdAt: new Date(), updatedAt: new Date() },
      
      // Workshop Programming untuk TI dan SI
      { id_kegiatan: jadwal[1].id_kegiatan, id_kelompok: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[1].id_kegiatan, id_kelompok: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[1].id_kegiatan, id_kelompok: 3, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[1].id_kegiatan, id_kelompok: 4, createdAt: new Date(), updatedAt: new Date() },
      
      // Seminar Kewirausahaan untuk semua kelompok
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 3, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 4, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 5, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 6, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 7, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[2].id_kegiatan, id_kelompok: 8, createdAt: new Date(), updatedAt: new Date() },
      
      // Pelatihan Soft Skills untuk semua kelompok
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 3, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 4, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 5, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 6, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 7, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[3].id_kegiatan, id_kelompok: 8, createdAt: new Date(), updatedAt: new Date() },
      
      // Diskusi Panel untuk TI, SI, dan TK
      { id_kegiatan: jadwal[4].id_kegiatan, id_kelompok: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[4].id_kegiatan, id_kelompok: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_kegiatan: jadwal[4].id_kegiatan, id_kelompok: 3, createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('JadwalKelompok', jadwalKelompokData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JadwalKelompok', null, {});
    await queryInterface.bulkDelete('JadwalKegiatan', null, {});
  }
}; 