'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Materi.hasMany(models.Tugas, { foreignKey: 'id_materi' });
    }
  }
  Materi.init({
    id_materi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    judul_materi: DataTypes.STRING,
    deskripsi_materi: DataTypes.TEXT,
    file_path: DataTypes.STRING,
    file_size: DataTypes.INTEGER,
    file_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materi',
    freezeTableName: true
  });
  return Materi;
};