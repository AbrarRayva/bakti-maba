'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('adminSuper', 10);
    
    await queryInterface.bulkInsert('User', [{
      id_user: 1,
      nama: 'Super Admin',
      password: hashedPassword,
      nim: '0000000000',
      role: 'admin',
      is_blocked: false,
      total_poin: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', { id_user: 1 }, {});
  }
};
