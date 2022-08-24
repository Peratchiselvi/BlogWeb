'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments','PostId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Posts',
        key: 'id'
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments','PostId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Posts',
        key: 'id'
      }
    })
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
