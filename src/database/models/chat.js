export default (sequelize, DataTypes) => {
  const chat = sequelize.define(
    'chat',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {}
  );
  chat.associate = (models) => {
    chat.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return chat;
};
