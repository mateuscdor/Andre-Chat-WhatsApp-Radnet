const Atendente = require("../models/atendente");
const funcoes = require("../funcoes/funcoes");

require("dotenv").config();

module.exports = (app) => {
  let usuario = null;

  app.get("/perfil", async function (req, res) {
    let usuarioLogado = funcoes.retornarUsuarioLogado();
    this.usuario = usuarioLogado;
    console.log(usuarioLogado[0]);
    res.redirect("/perfil/" + usuarioLogado[0].id);
  });

  app.get("/perfil/:id", async function (req, res) {
    let ip_servidor = process.env.IP_SERVIDOR;

    let id = req.params.id;
    let atendente = await Atendente.buscarAtendente(id);

    res.render("pages/perfil", {
      id: req.params.id,
      ip_servidor: ip_servidor,
      usuario: atendente[0],
    });
  });
};
