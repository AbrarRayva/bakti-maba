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
      User.hasMany(models.Reward, { foreignKey: 'nim' });
      User.hasMany(models.Absensi, { foreignKey: 'nim' });
      User.hasMany(models.ForumThread, { foreignKey: 'nim_pembuat' });
      User.hasMany(models.ForumPost, { foreignKey: 'nim' });
      User.belongsToMany(models.Tugas, { through: 'PengumpulanTugas', foreignKey: 'nim' });
      User.belongsToMany(models.ForumPost, { through: 'PostUpvote', as: 'UpvotedPosts', foreignKey: 'nim' });
      User.belongsTo(models.Kelompok, { foreignKey: 'id_kelompok' });
    }
  }
  User.init({
    nim: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    nama: DataTypes.STRING,
    password: DataTypes.STRING,
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