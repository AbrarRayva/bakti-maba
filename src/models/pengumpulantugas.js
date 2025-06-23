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
      PengumpulanTugas.belongsTo(models.Tugas, { foreignKey: 'id_tugas' });
      PengumpulanTugas.belongsTo(models.User, { foreignKey: 'id_user', as: 'User' });
    }
  }
  PengumpulanTugas.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_pengumpulan'
    },
    file_submission: {
      type: DataTypes.STRING,
      field: 'lokasi_file' 
    },
    link_submission: {
        type: DataTypes.STRING,
        allowNull: true
    },
    waktu_pengumpulan: {
      type: DataTypes.DATE,
      field: 'waktu_upload'
    },
    nilai: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PengumpulanTugas',
    freezeTableName: true
  });
  return PengumpulanTugas;
};