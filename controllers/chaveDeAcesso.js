const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/chave-de-acesso", Auth, function (req, res) {
    res.render("pages/chaves");
  });
};
