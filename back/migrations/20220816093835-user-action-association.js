'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      const transaction = await queryInterface.sequelize.transaction();
      await queryInterface.addColumn('Replyactions','UserId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },{transaction});
      await queryInterface.addColumn('CommentActions','UserId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },{transaction});
      await queryInterface.addColumn('PostActions','UserId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },{transaction});
      transaction.commit();
    }
    catch(err){
      transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    try{
      const transaction = await queryInterface.sequelize.transaction();
      await queryInterface.removeColumn('Replyactions','UserId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },{transaction});
      await queryInterface.removeColumn('CommentActions','UserId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },{transaction});
      await queryInterface.removeColumn('PostActions','UserId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },{transaction});
      transaction.commit();
    }
    catch(err){
      transaction.rollback();
    }
  }
};
