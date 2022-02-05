const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/ajustes", Auth, function (req, res) {
    res.render("pages/ajustes");
  });
};
