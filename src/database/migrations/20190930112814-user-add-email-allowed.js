/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'emailAllowed', Sequelize.BOOLEAN),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'emailAllowed')
};
