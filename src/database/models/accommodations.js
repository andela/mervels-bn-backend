const accommodations = (sequelize, DataTypes) => {
  const Accommodations = sequelize.define(
    'Accommodations',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'Available',
        validate: {
          isIn: {
            args: [['Available', 'Unavailable']],
            msg: 'Status can only be Available or Unavailable'
          }
        }
      },
      imageUrl: {
        allowNull: true,
        type: DataTypes.STRING
      },
      locationId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  Accommodations.associate = (models) => {
    Accommodations.hasMany(models.Rooms, {
      foreignKey: 'accommodationId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Accommodations.belongsTo(models.Locations, {
      foreignKey: 'locationId',
      onDelete: 'CASCADE'
    });
  };
  return Accommodations;
};
export default accommodations;
