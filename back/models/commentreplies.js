'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentReplies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentReplies.hasMany(models.Users);
      models.Users.belongsTo(CommentReplies);
    }
  }
  CommentReplies.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    ReplyId: DataTypes.INTEGER,
    CommentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    deletedAt: {type: DataTypes.DATE}
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CommentReplies',
  });
  return CommentReplies;
};