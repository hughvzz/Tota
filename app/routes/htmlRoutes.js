var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/micava");
    }
    res.render("index");
  });

  app.get("/enviar", isAuthenticated, function (req, res) {
    db.pedidosDetalle.findAll({
      group: ["producto"],
      attributes: [[db.Sequelize.fn('SUM', db.Sequelize.col('cantidad')), 'cantidad'], "producto"],
      include: [{
        model: db.pedidos,
        where: {
          userId: req.user
        }
      }]
    }).then(function (cava) {
      var iterator = [];
      for (i = 0; i < cava.length; i++) {
        cava[i].i = i + 1;
      }
      res.render("micava", {
        cava: cava,
      });
    });
  });


  app.get("/micava", isAuthenticated, function (req, res) {

    db.pedidosDetalle.findAll({
      group: ["producto"],
      attributes: [[db.Sequelize.fn('SUM', db.Sequelize.col('cantidad')), 'cantidad'], "producto"],
      include: [{
        model: db.pedidos,
        where: {
          userId: 1
        }
      }]
    }).then(function (cava) {
      var iterator = [];
      for (i = 0; i < cava.length; i++) {
        cava[i].i = i + 1;
      }
      res.render("micava", {
        cava: cava,
      });
    });
  });

  app.get("/carrito", isAuthenticated, function (req, res) {
    db.productos.findAll({}).then(function (prod) {
      var cerveza = [];
      var artesanal = [];
      var licor = [];
      var vino = [];
      
      for (i = 0; i < prod.length; i++) {
        var catId = prod[i].dataValues.categoriaId;
        var newObj = prod[i].dataValues;
        if (catId === 1) {
          cerveza.push(newObj);
        } else if (catId === 2) {
          artesanal.push(newObj);
        } else if (catId === 3) {
          licor.push(newObj);
        } else if (catId === 4) {
          vino.push(newObj);
        }
      }
      res.render("carrito", {
        cerveza: cerveza,
        artesanal: artesanal,
        licor: licor,
        vino: vino
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });





};
