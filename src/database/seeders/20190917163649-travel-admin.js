/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Bahati",
          lastName: "Robben",
          userEmail: "bahatiroben@gmail.com",
          userPassword:
            "$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2",
          userRoles: "Travel Administrator",
          accountVerified: "True",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "requester",
          lastName: "Requester",
          userEmail: "requester@gmail.com",
          userPassword:
            "$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2",
          userRoles: "Requester",
          accountVerified: "True",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {})
};
