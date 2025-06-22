'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JadwalKegiatan', {
      id_kegiatan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_lokasi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Lokasi',
          key: 'id_lokasi'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nama_kegiatan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      waktu_mulai: {
        type: Sequelize.TIME,
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
    await queryInterface.dropTable('JadwalKegiatan');
  }
};