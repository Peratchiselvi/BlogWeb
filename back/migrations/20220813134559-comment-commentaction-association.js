'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('CommentActions','CommentId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Comments',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('CommentActions','CommentId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Comments',
        key: 'id'
      }
    })
  }
};
