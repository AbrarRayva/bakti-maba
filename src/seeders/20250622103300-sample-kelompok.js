'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kelompok', [
      {
        nama_kelompok: 'Teknik Informatika',
        deskripsi: 'Program studi Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Sistem Informasi',
        deskripsi: 'Program studi Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Komputer',
        deskripsi: 'Program studi Teknik Komputer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Manajemen Informatika',
        deskripsi: 'Program studi Manajemen Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Elektro',
        deskripsi: 'Program studi Teknik Elektro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Mesin',
        deskripsi: 'Program studi Teknik Mesin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Sipil',
        deskripsi: 'Program studi Teknik Sipil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Arsitektur',
        deskripsi: 'Program studi Arsitektur',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kelompok', null, {});
  }
}; 