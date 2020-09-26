'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    name: DataTypes.STRING,
    ip: DataTypes.STRING,
    mac: DataTypes.STRING
  }, {});
  Resource.associate = function(models) {

    Resource.hasMany(models.ticket, {
      foreignKey: 'id',
      // as: 'ticket_resource',
    });

    Resource.belongsTo(models.user, {
      foreignKey: 'id',
      // as: 'user_resource',
    });

  };
  return Resource;
};