/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserProfiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    birthDate: {
      type: Sequelize.DATE
    },
    department: {
      type: Sequelize.STRING
    },
    lineManager: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    language: {
      type: Sequelize.STRING
    },
    currency: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserProfiles')
};
