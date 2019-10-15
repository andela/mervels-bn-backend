/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import emitter from '../../utils/eventEmitters/emitter';

module.exports = (sequelize, DataTypes) => {
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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          isValidDate(dates) {
            const regexp = /^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
            dates.forEach((date) => {
              if (!regexp.test(date)) {
                throw new Error('Date of format YYYY-MM-DD allowed.');
              }
            });
            return dates;
          }
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
      },
      passportName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passportNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['MALE', 'FEMALE', 'OTHER']],
            msg: 'Gender can only be MALE, FEMALE or OTHER'
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Requests.associate = (models) => {
    Requests.belongsTo(models.Users, {
      foreignKey: 'user',
      as: 'requester',
      onDelete: 'CASCADE'
    });
    Requests.belongsToMany(models.Accommodations, {
      through: 'AccommodationRequests',
      as: 'accommodations',
      foreignKey: 'requestId'
    });
    Requests.hasMany(models.Comment, {
      foreignKey: 'request'
    });
    Requests.hasMany(models.Notifications, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE'
    });
  };
  Requests.afterCreate(({ dataValues }) => {
    emitter.emit('request created', dataValues);
  });
  Requests.afterBulkUpdate((data) => {
    data.individualHooks = true;
    sequelize
      .query(`SELECT * FROM "Requests" WHERE id = ${data.where.id}`, {
        type: sequelize.QueryTypes.SELECT
      })
      .then((request) => {
        emitter.emit('request update', request[0]);
      });
  });
  return Requests;
};
