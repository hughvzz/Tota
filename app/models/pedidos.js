"use strict";

module.exports = function(sequelize, DataTypes) {
  var pedidos = sequelize.define("pedidos", {
    // Giving the Author model a name of type STRING
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    subtotal: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL
  });

  pedidos.associate = function(models) {
    pedidos.hasMany(models.pedidosDetalle, {
      onDelete: "cascade"
    });
    pedidos.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return pedidos;
};
