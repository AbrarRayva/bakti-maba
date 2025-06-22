'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Lokasi', [
      {
        nama_lokasi: 'Fakultas Teknologi Informasi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_lokasi: 'Fakultas Teknik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_lokasi: 'Auditorium',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_lokasi: 'Convention Hall',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lokasi', null, {});
  }
}; 