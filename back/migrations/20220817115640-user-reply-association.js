'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('CommentReplies','UserId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Users',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('CommentReplies','UserId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Users',
        key: 'id'
      }
    })
  }
};
