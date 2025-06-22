'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ForumPost.belongsTo(models.User, { foreignKey: 'id_user' });
      ForumPost.belongsTo(models.ForumThread, { foreignKey: 'id_thread' });
      
      // Self-referencing for replies
      ForumPost.belongsTo(models.ForumPost, { as: 'Parent', foreignKey: 'parent_post_id' });
      ForumPost.hasMany(models.ForumPost, { as: 'Replies', foreignKey: 'parent_post_id' });
      ForumPost.belongsToMany(models.User, { through: 'PostUpvote', as: 'Upvoters', foreignKey: 'id_post' });
    }
  }
  ForumPost.init({
    id_post: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    parent_post_id: DataTypes.INTEGER,
    isi_pesan: DataTypes.TEXT,
    waktu_kirim: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ForumPost',
  });
  return ForumPost;
};