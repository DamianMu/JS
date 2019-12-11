'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING
  }, {});
  Type.associate = function(models) {

    Type.hasMany(models.Task);
    // associations can be defined here
  };
  return Type;
};