'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Lokasi', [
      {
        nama_lokasi: 'Aula Utama',
        alamat: 'Gedung A Lantai 1, Kampus Universitas',
        koordinat_x: 100,
        koordinat_y: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_lokasi: 'Lab Komputer 1',
        alamat: 'Gedung B Lantai 2, Fakultas Teknik',
        koordinat_x: 150,
        koordinat_y: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_lokasi: 'Ruang Seminar',
        alamat: 'Gedung C Lantai 3, Pusat Kegiatan Mahasiswa',
        koordinat_x: 200,
        koordinat_y: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_lokasi: 'Auditorium',
        alamat: 'Gedung D Lantai 1, Kampus Pusat',
        koordinat_x: 250,
        koordinat_y: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_lokasi: 'Ruang Meeting',
        alamat: 'Gedung E Lantai 2, Fakultas Ekonomi',
        koordinat_x: 300,
        koordinat_y: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lokasi', null, {});
  }
}; 