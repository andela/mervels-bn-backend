/* eslint-disable no-unused-vars */
export default (sequelize, DataTypes) => {
  const Requests = sequelize.define(
    'Requests',
    {
      from: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z]+,\s[a-zA-Z]+$/
        }
      },
      travelDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true
        }
      },
      returnDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true
        }
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
        validate: {
          isIn: {
            args: [['Pending', 'Approved', 'Rejected']],
            msg: 'Status can only be Pending, Approved or Rejected'
          }
        }
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      }
    },
    {}
  );
  Requests.associate = (models) => {
    Requests.belongsTo(models.Users, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    });
    Requests.belongsToMany(models.Accommodations, {
      through: 'AccommodationRequests',
      as: 'accommodations',
      foreignKey: 'requestId'
    });
  };
  return Requests;
};
