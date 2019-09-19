/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    from: {
      type: Sequelize.STRING
    },
    travelDate: {
      type: Sequelize.DATEONLY
    },
    returnDate: {
      type: Sequelize.DATEONLY
    },
    reason: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    user: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Requests')
};
