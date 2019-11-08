export default (sequelize, DataTypes) => {
  const ProfilePictures = sequelize.define(
    'ProfilePictures',
    {
      user: DataTypes.INTEGER,
      url: DataTypes.STRING
    },
    {}
  );
  ProfilePictures.associate = (models) => {
    ProfilePictures.belongsTo(models.Users, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    });
  };
  return ProfilePictures;
};
