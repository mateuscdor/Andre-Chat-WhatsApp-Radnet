const Canais = require("../models/canais");
const funcoes = require("../funcoes/funcoes");
const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/canais", Auth, async function (req, res) {
    let canais = await Canais.buscarCanais();
    res.render("pages/canais", {
      canais: canais,
    });
  });

  app.post("/cadastrarCanal", Auth, async function (req, res) {
    await Canais.inserirCanal(req.query);
    res.status(200).json("canal cadastrado");
  });

  app.post("/editarCanal", Auth, async function (req, res) {
    let canal = { nome: req.query.nome, fone: req.query.fone };
    await Canais.editarCanal(canal, req.query.fone_anterior);
    res.status(200).json("canal editado");
  });

  app.post("/excluirCanal", Auth, async function (req, res) {
    await Canais.excluirCanal(req.query.fone);
    res.status(200).json("canal excluido");
  });

  app.post("/desconectarCanal", Auth, async function (req, res) {
    await Canais.editarStatus(req.query.status, req.query.fone);
    funcoes.logout();
    res.status(200).json("canal editado");
  });

  app.post("/retornarSessao", Auth, async function (req, res) {
    let canal = await Canais.retornarSessao(req.query.fone);
    res.status(200).json(canal);
  });

  app.post("/buscarCanaisAtivos", Auth, async function (req, res) {
    let canais = await Canais.buscarCanaisAtivos();
    res.status(200).json(canais);
  });

  app.post("/buscarCanais", Auth, async function (req, res) {
    let canais = await Canais.buscarCanais();
    res.status(200).json(canais);
  });
};
