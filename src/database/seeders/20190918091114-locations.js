/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Locations",
      [
        {
          country: "Rwanda",
          city: "Kigali",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "Uganda",
          city: "Kampala",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "Nigeria",
          city: "Lagos",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Locations", null, {})
};
