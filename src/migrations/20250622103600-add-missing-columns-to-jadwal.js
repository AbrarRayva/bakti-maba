'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add missing columns to JadwalKegiatan table
    try {
      await queryInterface.addColumn('JadwalKegiatan', 'waktu_selesai', {
        type: Sequelize.TIME,
        allowNull: true
      });
    } catch (error) {
      console.log('Column waktu_selesai might already exist');
    }
    
    try {
      await queryInterface.addColumn('JadwalKegiatan', 'jenis_kegiatan', {
        type: Sequelize.STRING,
        allowNull: true
      });
    } catch (error) {
      console.log('Column jenis_kegiatan might already exist');
    }
    
    try {
      await queryInterface.addColumn('JadwalKegiatan', 'topik', {
        type: Sequelize.STRING,
        allowNull: true
      });
    } catch (error) {
      console.log('Column topik might already exist');
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('JadwalKegiatan', 'topik');
    } catch (error) {
      console.log('Column topik might not exist');
    }
    
    try {
      await queryInterface.removeColumn('JadwalKegiatan', 'jenis_kegiatan');
    } catch (error) {
      console.log('Column jenis_kegiatan might not exist');
    }
    
    try {
      await queryInterface.removeColumn('JadwalKegiatan', 'waktu_selesai');
    } catch (error) {
      console.log('Column waktu_selesai might not exist');
    }
  }
}; 