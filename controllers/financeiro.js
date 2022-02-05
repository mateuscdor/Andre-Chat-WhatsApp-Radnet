const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/financeiro", Auth, function (req, res) {
    res.render("pages/financeiro");
  });
};
