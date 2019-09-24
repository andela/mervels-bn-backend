/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Comments', 'deleted', Sequelize.BOOLEAN),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Comments', 'deleted')
};
