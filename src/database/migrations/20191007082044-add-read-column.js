/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Notifications', 'read', {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Notifications', 'read')
};
