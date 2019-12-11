/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Likes',
    [
      {
        user: 1,
        accommodation: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 1,
        accommodation: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: 1,
        accommodation: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Likes', null, {})
};
