'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lokasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lokasi.hasMany(models.JadwalKegiatan, { foreignKey: 'id_lokasi' });
    }
  }
  Lokasi.init({
    id_lokasi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_lokasi: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    koordinat_x: DataTypes.INTEGER,
    koordinat_y: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lokasi',
  });
  return Lokasi;
};