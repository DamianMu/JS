'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Task.associate = function(models) {

    Task.belongsTo(models.Type);
    
    // associations can be defined here
  };
  return Task;
};