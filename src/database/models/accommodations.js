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
      amenities: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      locationId: { type: DataTypes.INTEGER, allowNull: false },
      description: {
        allowNull: true,
        type: DataTypes.STRING
      },
      services: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
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
    Accommodations.belongsToMany(models.Requests, {
      through: 'AccommodationRequests',
      as: 'requests',
      foreignKey: 'accommodationId'
    });
    Accommodations.hasMany(models.Like, {
      foreignKey: 'accommodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Accommodations.hasMany(models.Feedbacks, {
      foreignKey: 'accommodation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Accommodations;
};
export default accommodations;
