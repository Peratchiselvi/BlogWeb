'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      const transaction = await queryInterface.sequelize.transaction();
      await queryInterface.addColumn('CommentReplies','deletedAt',
      {
        // type: Sequelize.Date,
        type: Sequelize.DATE
        // allowNull: true
      });
      await queryInterface.addColumn('Comments','deletedAt',
      {
        type: Sequelize.DATE
        // allowNull: true
      });
      await queryInterface.addColumn('Posts','deletedAt',
      {
        type: Sequelize.DATE
        // allowNull: true
      });
      await queryInterface.addColumn('SavedPosts','deletedAt',
      {
        type: Sequelize.DATE
        // allowNull: true
      });
      // transaction.commit();
    }
    catch(err){
      // transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    try{
      // const transaction = await queryInterface.sequelize.transaction();
      await queryInterface.removeColumn('CommentReplies','deletedAt',
      {
        type: Sequelize.DATE
        // allowNull: true
      });
      await queryInterface.removeColumn('Comments','deletedAt',
      {
        type: Sequelize.DATE
        // allowNull: true
      });
      await queryInterface.removeColumn('Posts','deletedAt',
      {
        type: Sequelize.DATE
        // allowNull: true
      });
      await queryInterface.removeColumn('SavedPosts','deletedAt',
      {
        type: Sequelize.DATE
        // allowNull: true
      });
      // transaction.commit();
    }
    catch(err){
      // transaction.rollback();
    }
  }
};
// async down (queryInterface, Sequelize) {
//   try{
//     const transaction = await queryInterface.sequelize.transaction();
//     await queryInterface.removeColumn('CommentReplies','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     await queryInterface.removeColumn('Comments','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     await queryInterface.removeColumn('Posts','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     await queryInterface.removeColumn('SavedPosts','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     transaction.commit();
//   }
//   catch(err){
//     transaction.rollback();
//   }
// };

// async up (queryInterface, Sequelize) {
//   try{
//     const transaction = await queryInterface.sequelize.transaction();
//     await queryInterface.addColumn('CommentReplies','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     await queryInterface.addColumn('Comments','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     await queryInterface.addColumn('Posts','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     await queryInterface.addColumn('SavedPosts','isDeleted',
//     {
//       type: Sequelize.Date,
//       // allowNull: true
//     },{transaction: transaction});
//     transaction.commit();
//   }
//   catch(err){
//     transaction.rollback();
//   }
// },