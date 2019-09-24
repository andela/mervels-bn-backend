/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Accommodations',
    [
      {
        name: 'HOTEL',
        status: 'Available',
        imageUrl: null,
        locationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MARIOT',
        status: 'Unavailable',
        imageUrl: null,
        locationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SHERATON',
        status: 'Available',
        imageUrl: null,
        locationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})
};
