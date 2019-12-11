/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'marvel',
        lastName: 'devs',
        userEmail: 'davis.kabiswa@andela.com',
        userPassword: '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
        userRoles: 'Accommodation Supplier',
        accountVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
