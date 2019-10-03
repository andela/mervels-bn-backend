/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'AccommodationRequests',
    [
      {
        requestId: 1,
        accommodationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        requestId: 2,
        accommodationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        requestId: 3,
        accommodationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        requestId: 4,
        accommodationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})
};
