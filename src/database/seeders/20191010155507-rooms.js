/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Rooms',
    [
      {
        name: 'VIRUNGA',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 3,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'AKAGORO',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 1,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MASAIMARA',
        type: '1bedroom',
        status: 'Unavilable',
        accommodationId: 3,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'REST',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 3,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})
};
