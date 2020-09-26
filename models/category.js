'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {

    category.hasMany(models.ticket, {
      foreignKey: 'category_id',
      as: 'ticket_category',
    });

  };
  return category;
};