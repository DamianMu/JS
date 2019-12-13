'use strict';
module.exports = (sequelize, DataTypes) => {
  const client = sequelize.define('client', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    product: DataTypes.STRING,
    productCost: DataTypes.INTEGER
  }, {});
  client.associate = function(models) {

    client.belongsTo(models.Type);
    // associations can be defined here
  };
  return client;
};