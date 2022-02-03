const { buscarTodasMensagensSistema } = require("../models/mensagensSistema");
const Auth = require("../middlewares/auth");
require("dotenv").config();

module.exports = (app) => {
  app.get("/mensagens", Auth, async function (req, res) {
    let ip_servidor = process.env.IP_SERVIDOR;
    res.render("pages/mensagens");
  });

  app.post("/pegarMensagensSistema", async function (req, res) {
    let mensagens = await buscarTodasMensagensSistema();
    res.status(200).json(mensagens);
  });
};
