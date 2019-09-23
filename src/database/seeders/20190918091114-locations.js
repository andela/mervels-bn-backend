/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Locations',
    [
      {
        country: 'RWANDA',
        city: 'KIGALI',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country: 'UGANDA',
        city: 'KAMPALA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country: 'NIGERIA',
        city: 'LAGOS',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})
};
