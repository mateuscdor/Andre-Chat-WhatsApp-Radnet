const Auth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/status-do-servidor", Auth, function (req, res) {
    res.render("pages/status");
  });
};
