'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Followers','isFollowing',{
      type: Sequelize.BOOLEAN,
      defaultValue: true
      
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Followers','isFollowing',{
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })
  }
};