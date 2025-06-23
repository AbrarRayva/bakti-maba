'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PengumpulanTugas', {
      id_pengumpulan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tugas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tugas',
          key: 'id_tugas'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lokasi_file: {
        type: Sequelize.STRING,
        allowNull: true
      },
      link_submission: {
        type: Sequelize.STRING,
        allowNull: true
      },
      waktu_upload: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      nilai: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('PengumpulanTugas');
  }
};