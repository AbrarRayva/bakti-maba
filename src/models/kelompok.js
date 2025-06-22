'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kelompok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kelompok.hasMany(models.User, { foreignKey: 'id_kelompok' });
      Kelompok.belongsToMany(models.JadwalKegiatan, { 
        through: 'JadwalKelompok',
        foreignKey: 'id_kelompok',
        otherKey: 'id_kegiatan'
      });
    }
  }
  Kelompok.init({
    id_kelompok: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_kelompok: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Kelompok',
    freezeTableName: true
  });
  return Kelompok;
}; 