'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      const transaction = await queryInterface.sequelize.transaction();
      await queryInterface.addColumn('CommentReplies','CommentId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Comments',
          key: 'id'
        }
      },{transaction});
      await queryInterface.addColumn('CommentReplies','ReplyId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Replies',
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
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.removeColumn('CommentReplies','CommentId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Comments',
          key: 'id'
        }
      },{transaction});
      await queryInterface.removeColumn('CommentReplies','ReplyId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Replies',
          key: 'id'
        }
      },{transaction});
      transaction.commit();
    }
    catch(err){
      transaction.rollback();
    }
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
