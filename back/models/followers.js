'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
            // define association here
    }
  }
  Followers.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    user: DataTypes.INTEGER,
    follower: DataTypes.INTEGER,
    isFollowing: {type: DataTypes.BOOLEAN}
    // deletedAt: DataTypes.DATE
  }, {
    sequelize,
    // paranoid: true,
    modelName: 'Followers',
  });
  return Followers;
};