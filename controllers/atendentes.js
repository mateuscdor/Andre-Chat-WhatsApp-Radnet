const funcoes = require("../funcoes/funcoes");
const Atendente = require("../models/atendente");
const Auth = require("../middlewares/auth");

require("dotenv").config();

module.exports = (app) => {
  app.get("/atendentes", Auth, async function (req, res) {
    let todosAtendentes = await Atendente.buscarTodosAtendentes();

    if (todosAtendentes == 0 || !todosAtendentes.length) {
      res.render("pages/404");
    } else {
      res.render("pages/atendentes", {
        atendente: todosAtendentes,
        registros: todosAtendentes.length,
        ip_servidor: process.env.IP_SERVIDOR,
      });
    }
  });

  app.post("/atendentes-cadastrar", Auth, async function (req, res) {
    await Atendente.cadastrarAtendente(req.query);
    res.status(200).json("cadastro feito com sucesso");
  });

  app.post("/buscarTodosAtendentes", Auth, async function (req, res) {
    let todosAtendentes = await Atendente.buscarTodosAtendentes();
    res.status(200).json(todosAtendentes);
  });

  app.post("/excluir-atendente", Auth, async function (req, res) {
    await Atendente.excluirAtendente(req.query.id);
    res.status(200).json("exclusao feito com sucesso");
  });

  app.post("/atualizar-atendente", async function (req, res) {
    atendenteAtualizar = {
      nome: req.query.nome,
      sobrenome: req.query.sobrenome,
      email: req.query.email,
      usuario: req.query.usuario,
      senha: req.query.senha,
      nivel_acesso: req.query.nivel_acesso,
      status: req.query.status,
    };
    await Atendente.atualizarAtendente(atendenteAtualizar, req.query.id);

    res.status(200).json("atualização feito com sucesso");
  });
};
