export default (sequelize, DataTypes) => {
  const AccommodationRequests = sequelize.define("AccommodationRequests", {
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Requests",
        key: "id"
      }
    },
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Accommodations",
        key: "id"
      }
    }
  });
  return AccommodationRequests;
};
