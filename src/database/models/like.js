export default (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
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
  Like.associate = (models) => {
    Like.belongsTo(models.Accommodations, {
      foreignKey: 'accommodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Like.belongsTo(models.Users, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    });
  };
  return Like;
};
