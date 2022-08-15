const sequelize = require('../root');
const Sequelize = require("sequelize");

const CommentReply = sequelize.define(
    "CommentReply", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    }
);

module.exports = CommentReply;