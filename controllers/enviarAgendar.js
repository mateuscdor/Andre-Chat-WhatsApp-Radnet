const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/enviar-agendar", Auth, function (req, res) {
    res.render("pages/enviarAgendar");
  });
};
