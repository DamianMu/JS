'use strict';
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    name: DataTypes.STRING
  }, {});
  status.associate = function(models) {

    status.hasMany(models.ticket, {
      foreignKey: 'status_id',
    });
  };
  return status;
};