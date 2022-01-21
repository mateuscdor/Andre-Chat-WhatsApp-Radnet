const isAuth = require("../middlewares/auth");

module.exports = (app) => {
  let logado = null;

  app.get(
    "/home",
    /*isAuth,*/ function (req, res) {
      res.render("pages/home", {
        id: this.logado.id,
        nome: this.logado.nome,
      });
    }
  );
};
