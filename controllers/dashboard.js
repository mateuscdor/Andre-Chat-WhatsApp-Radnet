const Canais = require("../models/canais");
const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/dashboard", Auth, async function (req, res) {
    let todosCanais = await Canais.buscarCanais();
    res.render("pages/dashboard", {
      usuario: req.session.nome,
      canais: todosCanais,
    });
  });
};
