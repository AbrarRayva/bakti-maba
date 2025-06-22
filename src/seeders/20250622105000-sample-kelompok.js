'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kelompok', [
      {
        nama_kelompok: 'Kelompok A - Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Kelompok B - Sistem Informasi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Kelompok C - Teknik Komputer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Kelompok D - Manajemen Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_kelompok: 'Kelompok E - Teknik Telekomunikasi',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kelompok', null, {});
  }
}; 