'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    subject: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  ticket.associate = function(models) {

    ticket.hasOne(models.category, {
      foreignKey: 'id',
    });

    ticket.hasMany(models.ticket_comment, {
      foreignKey: 'id',
    });

    ticket.hasOne(models.status, {
      foreignKey: 'id',
    });

    ticket.hasOne(models.priority, {
      foreignKey: 'id',
    });

    ticket.hasOne(models.Resource, {
      foreignKey: 'id',
    });

    ticket.hasOne(models.user, {
      foreignKey: 'id',
    });

    ticket.hasOne(models.engineer, {
      foreignKey: 'id',
    });

  };
  return ticket;
};