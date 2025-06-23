'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Reward, { foreignKey: 'id_user' });
      User.hasMany(models.Absensi, { foreignKey: 'id_user' });
      User.hasMany(models.ForumThread, { foreignKey: 'id_user_pembuat' });
      User.hasMany(models.ForumPost, { foreignKey: 'id_user' });
      User.belongsToMany(models.Tugas, { through: 'PengumpulanTugas', foreignKey: 'id_user' });
      User.belongsToMany(models.ForumPost, { through: 'PostUpvote', as: 'UpvotedPosts', foreignKey: 'id_user' });
      User.belongsTo(models.Kelompok, { foreignKey: 'id_kelompok' });
      User.hasMany(models.PengumpulanTugas, { foreignKey: 'id_user', as: 'submissions' });
    }
  }
  User.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    password: DataTypes.STRING,
    nim: DataTypes.STRING,
    id_kelompok: DataTypes.INTEGER,
    role: DataTypes.STRING,
    is_blocked: DataTypes.BOOLEAN,
    total_poin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};