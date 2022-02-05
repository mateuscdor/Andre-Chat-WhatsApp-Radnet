const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/departamento", Auth, function (req, res) {
    res.render("pages/departamento");
  });
};
