'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SesiAbsensi', {
      id_sesi_absen: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_kegiatan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'JadwalKegiatan',
          key: 'id_kegiatan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      qr_code_data: {
        type: Sequelize.STRING,
        unique: true
      },
      waktu_buka: {
        type: Sequelize.DATE,
        allowNull: false
      },
      waktu_tutup: {
        type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.dropTable('SesiAbsensi');
  }
};