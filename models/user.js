module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("user", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    addressTwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.DATE,
    zip: DataTypes.INTEGER,
    dob: DataTypes.DATE,
  
  });
  return Todo;
};
