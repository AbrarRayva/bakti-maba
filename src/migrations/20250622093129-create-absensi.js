'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Absensi', {
      id_absensi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_sesi_absen: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SesiAbsensi',
          key: 'id_sesi_absen'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      waktu_absensi: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      status_kehadiran: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['hadir', 'izin', 'sakit', 'alpa']]
        }
      },
      metode_absensi: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['qr', 'manual']]
        }
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
    await queryInterface.dropTable('Absensi');
  }
};