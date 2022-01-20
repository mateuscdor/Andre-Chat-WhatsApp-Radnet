const funcoes = require("../funcoes/funcoes");
const Canais = require("../models/canais");

module.exports = (app) => {
  let usuario = null;
  let todosCanais = null;

  app.get("/dashboard", async function (req, res) {
    this.usuario = await funcoes.retornarUsuarioLogado();
    this.todosCanais = await Canais.buscarCanais();
    res.render("pages/dashboard", {
      usuario: this.usuario[0],
      canais: this.todosCanais,
    });
  });
};
