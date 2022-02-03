const Atendente = require("../models/atendente");
const funcoes = require("../funcoes/funcoes");
const Logados = require("../models/logados");

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.render("pages/login");
  });

  app.post("/", async function (req, res) {
    let email = req.body.email;
    let senha = req.body.password;

    let login = await Atendente.buscarLogin(email, senha);

    if (email.length && senha.length) {
      let usuarioLogando = login[0];

      if (!login.length) {
        res.redirect("/?erro=" + "nao foi possivel altenticar");
      } else {
        req.session.isAuth = true;

        req.session.id_usuario = usuarioLogando.id;
        req.session.nome = usuarioLogando.nome;
        req.session.usuario = usuarioLogando.usuario;

        res.redirect("/home");
      }
    } else {
      res.redirect("/?erro=" + "preencha todos os campos");
    }
  });
};
