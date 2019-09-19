/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Jonathan',
        lastName: 'Shyaka',
        userEmail: 'jonashyaka2@gmail.com',
        userPassword: '$2b$10$JX.ayT7zWc8UKNA3sY8TS.mGOGHLgaO/CQ3rkQhRNeBAprewjaGhe',
        userRoles: 'Requester',
        accountVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
