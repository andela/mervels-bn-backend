export default (sequelize, DataTypes) => {
  const Feedbacks = sequelize.define(
    'Feedbacks',
    {
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accommodation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      }
    },
    {}
  );
  Feedbacks.associate = (models) => {
    Feedbacks.belongsTo(models.Users, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    });
    Feedbacks.belongsTo(models.Accommodations, {
      foreignKey: 'accommodation',
      onDelete: 'CASCADE'
    });
  };
  return Feedbacks;
};
