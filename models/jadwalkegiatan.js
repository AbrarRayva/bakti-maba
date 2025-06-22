'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JadwalKegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JadwalKegiatan.belongsTo(models.Lokasi, { foreignKey: 'id_lokasi' });
      JadwalKegiatan.hasMany(models.SesiAbsensi, { foreignKey: 'id_kegiatan' });
    }
  }
  JadwalKegiatan.init({
    id_kegiatan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_kegiatan: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    tanggal: DataTypes.DATEONLY,
    waktu_mulai: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'JadwalKegiatan',
  });
  return JadwalKegiatan;
};