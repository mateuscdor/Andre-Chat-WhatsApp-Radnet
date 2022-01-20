const { buscarTodasMensagensSistema } = require("../models/mensagensSistema");
require("dotenv").config();

module.exports = (app) => {
  app.get("/mensagens", async function (req, res) {
    let ip_servidor = process.env.IP_SERVIDOR;
    res.render("pages/mensagens", { ip_servidor: ip_servidor });
  });

  app.post("/pegarMensagensSistema", async function (req, res) {
    let mensagens = await buscarTodasMensagensSistema();
    res.status(200).json(mensagens);
  });
};
