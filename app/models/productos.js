"use strict";

module.exports = function(sequelize, DataTypes) {
  var productos = sequelize.define("productos", {
    // Giving the Author model a name of type STRING
    nombre: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    inventario: DataTypes.INTEGER
  });

  productos.associate = function(models) {
    productos.belongsTo(models.categorias, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return productos;
};