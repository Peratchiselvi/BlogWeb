const sequelize = require('../root');
const Sequelize = require("sequelize");

const Users = sequelize.define(
    "Users", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mailId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contactNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }
);

module.exports = Users;