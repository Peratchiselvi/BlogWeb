'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      posts.hasMany(models.PostActions);
      models.PostActions.belongsTo(posts); 
      posts.hasMany(models.Comments);
      models.Comments.belongsTo(posts);       
    }
  }
  posts.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true},
    post: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    deletedAt: {type: DataTypes.DATE}
  }, {
    sequelize,
    paranoid: true,
    modelName: 'posts',
  });
  return posts;
};