'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Replies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Replies.hasMany(models.ReplyActions);
      models.ReplyActions.belongsTo(Replies);
      Replies.hasOne(models.CommentReplies);
      models.CommentReplies.belongsTo(Replies);
    }
  }
  Replies.init({
    // id:{ type: DataTypes.INTEGER, primaryKey: true},
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Replies',
  });
  return Replies;
};