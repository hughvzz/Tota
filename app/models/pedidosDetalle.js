"use strict";

module.exports = function(sequelize, DataTypes) {
  var pedidosDetalle = sequelize.define("pedidosDetalle", {
    // Giving the Author model a name of type STRING
    producto: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    enviado: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL,
    subTotal: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL
  });

  pedidosDetalle.associate = function(models) {
    pedidosDetalle.belongsTo(models.pedidos, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return pedidosDetalle;
};
