"use strict";

module.exports = function(sequelize, DataTypes) {
  var categorias = sequelize.define("categorias", {
    // Giving the Author model a name of type STRING
    categoria: DataTypes.STRING
  });

  categorias.associate = function(models) {
    categorias.hasMany(models.productos, {
      onDelete: "cascade"
    });
  };

  return categorias;
};