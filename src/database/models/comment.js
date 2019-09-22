export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      request: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      }
    },
    {}
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Requests, {
      foreignKey: 'request',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.Users, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
