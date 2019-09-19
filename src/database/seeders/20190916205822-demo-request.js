/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Requests",
      [
        {
          from: "Kigali, Rwanda",
          travelDate: "2019-10-01",
          returnDate: "2019-12-12",
          reason: "Business Travel",
          status: "Pending",
          user: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Requests", null, {})
};
