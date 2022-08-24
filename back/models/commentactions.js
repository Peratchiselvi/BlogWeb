'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentActions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommentActions.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true},
    action: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    CommentId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentActions',
  });
  return CommentActions;
};