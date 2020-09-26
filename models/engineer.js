'use strict';
module.exports = (sequelize, DataTypes) => {
  const engineer = sequelize.define('engineer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  engineer.associate = function(models) {

    engineer.hasMany(models.ticket, {
      foreignKey: 'engineer_id',
      as: 'ticket_engineer',
    });


  };
  return engineer;
};