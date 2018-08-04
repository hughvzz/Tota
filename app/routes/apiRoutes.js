var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/micava");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/cat", function (req, res) {
    db.categorias.create(req.body).then(function (dbCat) {
      res.json(dbCat);
    });
  });

  app.post("/api/prod", function (req, res) {
    db.productos.create(req.body).then(function (dbProd) {
      res.json(dbProd);
    });
  });

  app.get("/api/prodbtn/:id", function (req, res) {
    db.productos
      .findAll({
        where: {
          id: req.params.id
        }
      })
      .then(function (objProd) {
        console.log(objProd);
        res.json(objProd[0].dataValues);
      });
  });

  app.post("/api/nuevopedido", function (req, res) {
    console.log(req.user);
    var sentObj = req.body;
    var objPedidos = {
      subtotal: sentObj.subtotal,
      total: sentObj.total,
      UserId: req.user.id
    };
    var pedidos = db.pedidos.create(objPedidos);
    var detalles = pedidos.then(function (dbPedidos) {
      var pedidosDetalle = [];
      for (i = 0; i < sentObj.carrito.length; i++) {
        var objPath = sentObj.carrito[i];
        var newObj = {
          producto: objPath.nombre,
          cantidad: objPath.cantidad,
          precioUnitario: objPath.precio,
          subTotal: objPath.subtotal,
          total: objPath.total,
          pedidoId: dbPedidos.id
        };
        pedidosDetalle.push(newObj);
      }
      db.pedidosDetalle.bulkCreate(pedidosDetalle);
    });
    return Promise.all([pedidos, detalles]).then(function (dbPedidos, dbDetalles) {
      res.json({
        pedidos: dbPedidos,
        detalles: dbDetalles
      });
    });
  });
};
