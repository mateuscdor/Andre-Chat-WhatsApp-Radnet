const Atendente = require("../models/atendente");
const funcoes = require("../funcoes/funcoes");
const Auth = require("../middlewares/auth");
const Session = require("../models/session");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

require("dotenv").config();

module.exports = (app) => {
  app.get("/perfil", Auth, async function (req, res) {
    res.redirect("/perfil/" + req.session.id_usuario);
  });

  app.get("/perfil/:id", async function (req, res) {
    let id = req.params.id;
    let atendente = await Atendente.buscarAtendente(id);

    res.render("pages/perfil", {
      id: req.params.id,
      usuario: atendente[0],
    });
  });

  app.post("/usuario-logado", async function (req, res) {
    let atendente = await Atendente.buscarAtendente(req.session.id_usuario);

    res.status(200).json(atendente);
  });

  app.post(
    "/atualizar-avatar",
    upload.single("file"),
    async function (req, res) {
      let caminho = "assets/uploads/" + req.file.filename;

      Atendente.cadastrarAvatar(caminho, req.session.id_usuario);

      res.redirect("/perfil/" + req.session.id_usuario);
    }
  );
};
