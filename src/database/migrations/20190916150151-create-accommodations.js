/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accommodations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    locationId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: true
    },
    imageUrl: {
      allowNull: true,
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    owner: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    maplocations: {
      allowNull: false,
      type: Sequelize.JSONB
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Accommodations')
};
