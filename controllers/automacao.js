const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/automacao", Auth, function (req, res) {
    res.render("pages/automacao");
  });
};
