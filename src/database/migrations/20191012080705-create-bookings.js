export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    requestId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Requests',
        key: 'id',
        as: 'requestId'
      }
    },
    roomId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Rooms',
        key: 'id',
        as: 'roomId'
      }
    },
    checkIn: {
      type: Sequelize.DATEONLY
    },
    checkOut: {
      type: Sequelize.DATEONLY
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Bookings')
};
