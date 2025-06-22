'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample jadwal
    const jadwalData = [
      {
        nama_kegiatan: 'Orientasi Mahasiswa Baru',
        deskripsi: 'Kegiatan orientasi untuk mahasiswa baru tahun 2024',
        tanggal: '2024-08-15',
        waktu_mulai: '08:00:00',
        id_lokasi: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Workshop Programming',
        deskripsi: 'Workshop dasar pemrograman untuk mahasiswa TI',
        tanggal: '2024-08-16',
        waktu_mulai: '09:00:00',
        id_lokasi: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Seminar Kewirausahaan',
        deskripsi: 'Seminar tentang kewirausahaan di era digital',
        tanggal: '2024-08-17',
        waktu_mulai: '13:00:00',
        id_lokasi: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Pelatihan Soft Skills',
        deskripsi: 'Pelatihan pengembangan soft skills mahasiswa',
        tanggal: '2024-08-18',
        waktu_mulai: '10:00:00',
        id_lokasi: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kegiatan: 'Kunjungan Industri',
        deskripsi: 'Kunjungan ke perusahaan teknologi terkemuka',
        tanggal: '2024-08-19',
        waktu_mulai: '07:30:00',
        id_lokasi: 4,
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
      
      // Kunjungan Industri untuk TI, SI, dan TK
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