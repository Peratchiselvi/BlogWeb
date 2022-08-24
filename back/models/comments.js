'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.hasMany(models.CommentActions);
      models.CommentActions.belongsTo(Comments);
      Comments.hasMany(models.CommentReplies);
      models.CommentReplies.belongsTo(Comments);
    }
  }
  Comments.init({
    id:{ type: DataTypes.INTEGER, primaryKey: true},
    comment: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    deletedAt: {type: DataTypes.DATE}
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Comments',
  });
  return Comments;
};