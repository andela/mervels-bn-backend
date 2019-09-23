export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'John',
        lastName: 'Doe',
        userEmail: 'johndoe@gmail.com',
        userPassword: '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
        userRoles: 'Super Administrator',
        accountVerified: 'True',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        userEmail: 'janedoe@gmail.com',
        userPassword: '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
        userRoles: 'Travel Administrator',
        accountVerified: 'True',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'James',
        lastName: 'Doe',
        userEmail: 'jamesdoe@gmail.com',
        userPassword: '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
        userRoles: 'Requester',
        accountVerified: 'True',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Joseph',
        lastName: 'Doe',
        userEmail: 'josephdoe@gmail.com',
        userPassword: '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
        userRoles: 'Requester',
        accountVerified: 'True',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jonathan',
        lastName: 'Shyaka',
        userEmail: 'jonashyaka2@gmail.com',
        userPassword: '$2b$10$JX.ayT7zWc8UKNA3sY8TS.mGOGHLgaO/CQ3rkQhRNeBAprewjaGhe',
        userRoles: 'Requester',
        accountVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dean',
        lastName: 'Winchester',
        userEmail: 'marveldev53@gmail.com',
        userPassword: '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
        userRoles: 'Manager',
        accountVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
