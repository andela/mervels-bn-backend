/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    passportName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    passportNumber: {
      allowNull: false,
      type: Sequelize.STRING
    },
    gender: {
      allowNull: false,
      type: Sequelize.STRING
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING
    },
    from: {
      type: Sequelize.STRING
    },
    travelDate: {
      type: Sequelize.ARRAY(Sequelize.STRING)
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
