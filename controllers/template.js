const funcoes = require("../funcoes/funcoes");
const Logados = require("../models/logados");
const session = require("express-session");
const Atendente = require("../models/atendente");

require("dotenv").config();

module.exports = (app) => {
  app.get("/logout", async function (req, res) {
    req.session.destroy((err) => {
      if (err) throw err;
    });

    funcoes.logout();
    let logado = await funcoes.retornarUsuarioLogado();
    console.log(logado);

    if (logado === null) {
      res.redirect("/");
    } else {
      console.log(logado);
      Logados.mudarStatus({ status: "desconectado" }, logado[0].nome);

      res.redirect("/");
    }
  });

  app.post("/conectar", async function (req, res) {
    let QrCode = await funcoes.conectar(req.query.sessao, req.query.fone);
    res.status(200).json(QrCode);
  });

  app.post("/inserir-primeiro-atendente", async function (req, res) {
    let atendente = [];
    atendente = await Atendente.buscarPrimeiroAtendente();
    if (!atendente.length) {
      await Atendente.inserirPrimeiroAtendente();
      res.send("Usuário cadastrado com sucesso");
    } else {
      res.send("Já existe um usuario cadastrado");
    }
  });
};
