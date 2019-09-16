/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Accommodations",
      [
        {
          name: "Hotel",
          status: "Available",
          imageUrl: null,
          locationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Locations", null, {})
};
