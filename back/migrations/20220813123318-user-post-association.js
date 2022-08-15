'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts','UserId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Users',
        key: 'id'
      }
    })
  //  await queryInterface.addConstraint('Posts',{
  //     fields: ['UserId'],
  //     type: 'primary key',
  //     references: {
  //       table: "Users",
  //       field: "id"
  //     }
  //   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts','UserId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Users',
        key: 'id'
      }
    })
    // await queryInterface.removeConstraint('posts',{
    //   fields: ['UserId'],
    //   type: 'foreign key',
    //   references: {
    //     table: "users",
    //     field: 'id'
    //   }
    // })
  }
};
