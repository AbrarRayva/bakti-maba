'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumThread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ForumThread.belongsTo(models.User, { foreignKey: 'id_user_pembuat' });
      ForumThread.hasMany(models.ForumPost, { foreignKey: 'id_thread' });
    }
  }
  ForumThread.init({
    id_thread: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    judul: DataTypes.STRING,
    isi_pembuka: DataTypes.TEXT,
    waktu_dibuat: DataTypes.DATE,
    is_pinned: DataTypes.BOOLEAN,
    is_open: DataTypes.BOOLEAN,
    akses: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ForumThread',
  });
  return ForumThread;
};