const sequelize = require('../root');
const Sequelize = require("sequelize");

const CommentActions = sequelize.define(
    "CommentActions", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // userMailId: {
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        action: {//like,dislike
            type: Sequelize.STRING,
            allowNull: false
        },
        // stuffId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        // stuffType: {//post,comment,reply
        //     type: Sequelize.STRING,
        //     allowNull: false
        // }
    }
);

module.exports = CommentActions;