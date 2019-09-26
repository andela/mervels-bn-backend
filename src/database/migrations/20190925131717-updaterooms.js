/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Rooms', 'price', Sequelize.FLOAT),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Rooms', 'price')
};
