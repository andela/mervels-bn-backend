export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      userPassword: DataTypes.STRING,
      userRoles: DataTypes.STRING
    },
    {}
  );
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
