/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Requests', 'booked', Sequelize.BOOLEAN),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Requests', 'booked')
};
