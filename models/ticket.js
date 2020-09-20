'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  ticket.associate = function(models) {
    // associations can be defined here
  };
  return ticket;
};