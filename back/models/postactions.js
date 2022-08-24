'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostActions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostActions.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true},
    action: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostActions',
  });
  return PostActions;
};