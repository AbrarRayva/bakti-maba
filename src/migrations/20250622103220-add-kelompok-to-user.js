'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'id_kelompok', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Kelompok',
        key: 'id_kelompok'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'id_kelompok');
  }
}; 