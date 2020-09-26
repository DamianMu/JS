'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket_comment = sequelize.define('ticket_comment', {
    description: DataTypes.STRING
  }, {});
  ticket_comment.associate = function(models) {

    ticket_comment.belongsTo(models.ticket, {
      foreignKey: 'ticket_id',
      as: 'ticket_comment',
    });
    
  };
  return ticket_comment;
};