'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password', 10);
    
    await queryInterface.bulkInsert('User', [{
      nim: '0000000000',
      nama: 'Super Admin',
      password: hashedPassword,
      role: 'admin',
      is_blocked: false,
      total_poin: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', { nim: '0000000000' }, {});
  }
};
