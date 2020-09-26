'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  user.associate = function(models) {

    user.hasMany(models.ticket, {
      foreignKey: 'id',
      // as: 'ticket_user',
    });

    user.hasMany(models.Resource, {
      foreignKey: 'id',
    });

  };
  return user;
};