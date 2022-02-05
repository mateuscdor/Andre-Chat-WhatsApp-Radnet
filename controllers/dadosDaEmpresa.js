const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/dados-da-empresa", Auth, function (req, res) {
    res.render("pages/dadosDaEmpresa");
  });
};
