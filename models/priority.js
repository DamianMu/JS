'use strict';
module.exports = (sequelize, DataTypes) => {
  const priority = sequelize.define('priority', {
    name: DataTypes.STRING
  }, {});
  priority.associate = function(models) {
    
    priority.hasMany(models.ticket, {
      foreignKey: 'id',
    });
  };
  return priority;
};