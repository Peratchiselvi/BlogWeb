'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.posts);
      models.posts.belongsTo(Users);
      Users.hasMany(models.Comments);
      models.Comments.belongsTo(Users);
      // Users.hasMany(models.Followers);
      // models.Followers.belongsTo(Users);
      // models.Posts.belongsTo(Users,{through: 'SavedPosts'});
    }
  }
  Users.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    userName: DataTypes.STRING,
    mailId: DataTypes.STRING,
    contactNo: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};