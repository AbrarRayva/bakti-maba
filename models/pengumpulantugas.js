'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PengumpulanTugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PengumpulanTugas.init({
    lokasi_file: DataTypes.STRING,
    waktu_upload: DataTypes.DATE,
    nilai: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PengumpulanTugas',
  });
  return PengumpulanTugas;
};