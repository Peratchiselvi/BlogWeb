const sequelize = require('../root');
const Sequelize = require("sequelize");

const Posts = sequelize.define(
    "Posts", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // postId:
        // userName: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        // userMailId: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        post:{
            type: Sequelize.STRING,
            allowNull: false
        },
        // likedBy:{
        //     type: Sequelize.STRING
        // },
        // dislikedBy:{
        //     type: Sequelize.STRING
        // }
    }
);

module.exports = Posts;