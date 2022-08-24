'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('SavedPosts','UserId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Users',
        key: 'id'
      }
    })
    await queryInterface.addColumn('SavedPosts','PostId',
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
    await queryInterface.removeColumn('SavedPosts','UserId',
    {
      type: Sequelize.INTEGER,
      references:{
        model: 'Users',
        key: 'id'
      }
    })
    await queryInterface.removeColumn('SavedPosts','PostId',
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
