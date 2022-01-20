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
        funcoes.inserirUsuarioLogado(login);

        let usuarioLogado = await Logados.pesquisarLogadoNome(login[0].nome);

        if (!usuarioLogado.length) {
          Logados.inserirUsuarioLogado({
            atendente: usuarioLogando.nome,
            status: "logado",
            id_atendente: usuarioLogando.id,
          });
        } else {
          Logados.mudarStatus({ status: "logado" }, usuarioLogado[0].atendente);
        }

        this.logado = { id: usuarioLogando.id, nome: usuarioLogando.nome };
        req.session.isAuth = true;

        res.redirect("/home");
      }
    } else {
      res.redirect("/?erro=" + "preencha todos os campos");
    }
  });
};
