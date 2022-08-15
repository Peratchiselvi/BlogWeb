const sequelize = require('../root');
const Sequelize = require("sequelize");

const Comments = sequelize.define(
    "Comments", {
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
        comment:{
            type: Sequelize.STRING,
            allowNull: false
        },
        // likedBy:{
        //     type: Sequelize.STRING
        // },
        // dislikedBy:{
        //     type: Sequelize.STRING
        // },
        // type:{
        //     type: Sequelize.STRING,
        //     allowNull: false
        // },
        // replyFor:{
        //     type: Sequelize.INTEGER
        // }
    }
);

module.exports = Comments;