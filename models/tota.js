module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("tota", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
  return Todo;
};
