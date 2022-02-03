const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/home", Auth, function (req, res) {
    res.render("pages/home");
  });
};
