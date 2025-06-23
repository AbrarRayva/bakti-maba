'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tugas', [
      {
        nama_tugas: 'Analisis Algoritma',
        deskripsi: 'Buatlah makalah yang menganalisis kompleksitas waktu dari algoritma sorting (Bubble, Merge, Quick). Bandingkan performa ketiganya dengan dataset yang berbeda ukuran.',
        deadline: new Date('2025-07-10T23:59:59'),
        file_path: 'https://example.com/link/to/assignment1/details',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_tugas: 'Desain Database Sistem Akademik',
        deskripsi: 'Rancang dan buat skema database untuk sistem informasi akademik sederhana. Skema harus mencakup entitas seperti Mahasiswa, Dosen, Mata Kuliah, dan Jadwal.',
        deadline: new Date('2025-07-15T23:59:59'),
        file_path: null, // This assignment might not have a file
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_tugas: 'Implementasi API dengan Node.js',
        deskripsi: 'Buat RESTful API menggunakan Express.js untuk manajemen data mahasiswa. API harus memiliki endpoint CRUD (Create, Read, Update, Delete) untuk data mahasiswa.',
        deadline: new Date('2025-07-20T23:59:59'),
        file_path: '/uploads/sample-assignment-file.pdf', // Example of a local file
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tugas', null, {});
  }
}; 