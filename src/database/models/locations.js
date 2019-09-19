export default (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    "Locations",
    {
      country: DataTypes.STRING,
      city: DataTypes.STRING
    },
    {}
  );
  Locations.associate = models => {
    Locations.hasMany(models.Accommodations, {
      foreignKey: "locationId",
      onDelete: "CASCADE"
    });
  };
  return Locations;
};
