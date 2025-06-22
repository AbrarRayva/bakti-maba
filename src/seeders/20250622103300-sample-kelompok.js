'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kelompok', [
      {
        nama_kelompok: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Komputer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Manajemen Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Elektro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Mesin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Teknik Sipil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Arsitektur',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kelompok', null, {});
  }
}; 