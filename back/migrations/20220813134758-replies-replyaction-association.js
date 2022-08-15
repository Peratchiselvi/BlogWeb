'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ReplyActions','ReplyId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Replies',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ReplyActions','ReplyId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Replies',
        key: 'id'
      }
    })
  }
};
