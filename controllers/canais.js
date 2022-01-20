const Canais = require("../models/canais");
const funcoes = require("../funcoes/funcoes");

module.exports = (app) => {
  app.get("/canais", async function (req, res) {
    let ip_servidor = process.env.IP_SERVIDOR;

    let canais = await Canais.buscarCanais();

    res.render("pages/canais", {
      ip_servidor: ip_servidor,
      canais: canais,
    });
  });

  app.post("/cadastrarCanal", async function (req, res) {
    console.log(req.query);
    await Canais.inserirCanal(req.query);
    res.status(200).json("canal cadastrado");
  });

  app.post("/editarCanal", async function (req, res) {
    console.log(req.query);
    let canal = { nome: req.query.nome, fone: req.query.fone };
    await Canais.editarCanal(canal, req.query.fone_anterior);
    res.status(200).json("canal editado");
  });

  app.post("/excluirCanal", async function (req, res) {
    console.log(req.query);
    await Canais.excluirCanal(req.query.fone);
    res.status(200).json("canal excluido");
  });

  app.post("/desconectarCanal", async function (req, res) {
    console.log(req.query);
    await Canais.editarStatus(req.query.status, req.query.fone);
    funcoes.logout();
    res.status(200).json("canal editado");
  });

  app.post("/retornarSessao", async function (req, res) {
    console.log(req.query);
    let canal = await Canais.retornarSessao(req.query.fone);
    res.status(200).json(canal);
  });

  app.post("/buscarCanaisAtivos", async function (req, res) {
    console.log(req.query);
    let canais = await Canais.buscarCanaisAtivos();
    res.status(200).json(canais);
  });

  app.post("/buscarCanais", async function (req, res) {
    console.log(req.query);
    let canais = await Canais.buscarCanais();
    res.status(200).json(canais);
  });
};
