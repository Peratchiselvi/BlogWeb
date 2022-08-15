const sequelize = require('../root');
const Sequelize = require("sequelize");
const SavedPosts = sequelize.define(
    "SavedPosts", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
        //userId,postId
    }
);

module.exports = SavedPosts;