// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../app/config/connection");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all new users
  app.get("/api/all", function(req, res) {
    var dbQuery = "SELECT * FROM user";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // Add a user
  app.post("/api/new", function(req, res) {
    console.log("newUser Data:");
    console.log(req.body);

    var dbQuery = "INSERT INTO user(firstName, LastName, email, password, address, address2, city, state, zip, dob) VALUES (?,?,?)";

    connection.query(dbQuery, [req.body.firstName, req.body.LastName, req.body.email, req.body.password, req.body.address, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.dob], function(err, result) {
      if (err) throw err;
      console.log("New user Successfully Saved!");
      res.end();
    });
  });
};
