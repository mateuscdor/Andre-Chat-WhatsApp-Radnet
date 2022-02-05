const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/suporte", Auth, function (req, res) {
    res.render("pages/suporte");
  });
};
