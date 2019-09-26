/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'marvel',
        lastName: 'devs',
        userEmail: 'davis.kabiswa@andela.com',
        userPassword: '$2b$10$rKNl5fvRE/xGFgBBGxWhD.wc.j.Ht8o/cjKvwrI1ME8phkRXUg1YC',
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
