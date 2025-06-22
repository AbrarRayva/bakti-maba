'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Absensi.belongsTo(models.User, { foreignKey: 'id_user' });
      Absensi.belongsTo(models.SesiAbsensi, { foreignKey: 'id_sesi_absen' });
    }
  }
  Absensi.init({
    id_absensi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    waktu_absensi: DataTypes.DATE,
    status_kehadiran: DataTypes.STRING,
    metode_absensi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Absensi',
  });
  return Absensi;
};