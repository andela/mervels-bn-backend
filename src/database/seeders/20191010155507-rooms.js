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
      },
      {
        name: 'ASERTE',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 3,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'RWEN',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 1,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CRURG',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 1,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BRET',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 1,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'AKAD',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 2,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'REDID',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 2,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CROTY',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 2,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SPATN',
        type: '2bedroom',
        status: 'Available',
        accommodationId: 2,
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})
};
