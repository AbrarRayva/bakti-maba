'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reward', {
      id_reward: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'nim'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      poin: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      keterangan: {
        type: Sequelize.STRING
      },
      tanggal_diberikan: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reward');
  }
};