/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'requestAutofill', Sequelize.BOOLEAN),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'requestAutofill')
};
