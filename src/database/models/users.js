/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i']
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i']
      }
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userRoles: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Travel Team Member', 'Travel Administrator', 'Manager', 'Requester']],
          msg:
            'User Roles must either be Travel Team Member, Travel Administrator, Manager or Requester'
        }
      }
    },
    accountVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
