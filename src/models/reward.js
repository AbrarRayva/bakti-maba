'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reward.belongsTo(models.User, { foreignKey: 'nim' });
    }
  }
  Reward.init({
    id_reward: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nim: DataTypes.STRING,
    poin: DataTypes.INTEGER,
    keterangan: DataTypes.STRING,
    tanggal_diberikan: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reward',
    freezeTableName: true
  });
  return Reward;
};