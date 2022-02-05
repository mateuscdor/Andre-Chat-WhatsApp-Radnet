const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/auditoria", Auth, function (req, res) {
    res.render("pages/auditoria");
  });
};
