'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await queryInterface.bulkInsert('User', [{
      id_user: 1,
      nama: 'Admin',
      nim: '0000000',
      password: hashedPassword,
      role: 'admin',
      is_blocked: false,
      total_poin: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', { role: 'admin' }, {});
  }
};
