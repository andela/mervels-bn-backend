/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      userId: DataTypes.INTEGER,
      birthDate: DataTypes.DATE,
      department: DataTypes.STRING,
      lineManager: DataTypes.INTEGER,
      phoneNumber: DataTypes.NUMERIC,
      language: DataTypes.STRING,
      currency: DataTypes.STRING,
      gender: DataTypes.STRING,
      location: DataTypes.STRING
    },
    {}
  );
  UserProfile.associate = function (models) {
    // associations can be defined here
  };
  return UserProfile;
};
