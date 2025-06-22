'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash password untuk semua user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Insert sample users
    const usersData = [
      {
        nama: 'Ahmad Fadillah',
        nim: '2021001',
        password: hashedPassword,
        id_kelompok: 1,
        role: 'peserta',
        is_blocked: false,
        total_poin: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Siti Nurhaliza',
        nim: '2021002',
        password: hashedPassword,
        id_kelompok: 1,
        role: 'peserta',
        is_blocked: false,
        total_poin: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Budi Santoso',
        nim: '2021003',
        password: hashedPassword,
        id_kelompok: 2,
        role: 'peserta',
        is_blocked: false,
        total_poin: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Dewi Sartika',
        nim: '2021004',
        password: hashedPassword,
        id_kelompok: 2,
        role: 'peserta',
        is_blocked: false,
        total_poin: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Rudi Hermawan',
        nim: '2021005',
        password: hashedPassword,
        id_kelompok: 3,
        role: 'peserta',
        is_blocked: true,
        total_poin: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Maya Indah',
        nim: '2021006',
        password: hashedPassword,
        id_kelompok: 3,
        role: 'peserta',
        is_blocked: false,
        total_poin: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Joko Widodo',
        nim: '2021007',
        password: hashedPassword,
        id_kelompok: 4,
        role: 'peserta',
        is_blocked: false,
        total_poin: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Sri Mulyani',
        nim: '2021008',
        password: hashedPassword,
        id_kelompok: 4,
        role: 'peserta',
        is_blocked: false,
        total_poin: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Prabowo Subianto',
        nim: '2021009',
        password: hashedPassword,
        id_kelompok: 5,
        role: 'peserta',
        is_blocked: false,
        total_poin: 175,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('User', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', { nim: [
      '2021001','2021002','2021003','2021004','2021005','2021006','2021007','2021008','2021009'] }, {});
  }
}; 