'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tugas.belongsTo(models.Materi, { foreignKey: 'id_materi' });
      Tugas.belongsToMany(models.User, { through: 'PengumpulanTugas', foreignKey: 'id_tugas' });
    }
  }
  Tugas.init({
    id_tugas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_tugas: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tugas',
    freezeTableName: true
  });
  return Tugas;
};