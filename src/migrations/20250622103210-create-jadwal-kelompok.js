'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JadwalKelompok', {
      id: {
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
      id_kelompok: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kelompok',
          key: 'id_kelompok'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Add unique constraint
    await queryInterface.addConstraint('JadwalKelompok', {
      fields: ['id_kegiatan', 'id_kelompok'],
      type: 'unique',
      name: 'unique_jadwal_kelompok'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JadwalKelompok');
  }
}; 