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

    res.redirect("/");
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

  app.get("/404", async function (req, res) {
    res.render("pages/404");
  });

  app.get("/500", async function (req, res) {
    res.render("pages/500");
  });
};
