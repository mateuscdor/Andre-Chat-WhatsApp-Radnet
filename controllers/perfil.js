const Atendente = require("../models/atendente");
const funcoes = require("../funcoes/funcoes");
const Auth = require("../middlewares/auth");
const Session = require("../models/session");

require("dotenv").config();

module.exports = (app) => {
  app.get("/perfil", Auth, async function (req, res) {
    res.redirect("/perfil/" + req.session.id_usuario);
  });

  app.get("/perfil/:id", async function (req, res) {
    let id = req.params.id;
    let atendente = await Atendente.buscarAtendente(id);

    res.render("pages/perfil", {
      id: req.params.id,
      usuario: atendente[0],
    });
  });
};
