const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/gerenciar", Auth, function (req, res) {
    res.render("pages/gerenciar");
  });
};
