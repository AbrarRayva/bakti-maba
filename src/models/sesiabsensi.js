'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SesiAbsensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SesiAbsensi.belongsTo(models.JadwalKegiatan, { foreignKey: 'id_kegiatan' });
      SesiAbsensi.hasMany(models.Absensi, { foreignKey: 'id_sesi_absen' });
    }
  }
  SesiAbsensi.init({
    id_sesi_absen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    qr_code_data: DataTypes.STRING,
    waktu_buka: DataTypes.DATE,
    waktu_tutup: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SesiAbsensi',
    freezeTableName: true
  });
  return SesiAbsensi;
};