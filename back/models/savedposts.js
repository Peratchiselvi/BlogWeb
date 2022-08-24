'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedPOsts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SavedPOsts.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    deletedAt: {type: DataTypes.DATE},
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'SavedPOsts',
  });
  return SavedPOsts;
};