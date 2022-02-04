const funcoes = require("../funcoes/funcoes");
require("dotenv").config();

module.exports = (app) => {
  app.post("/api/enviar-mensagem", async function (req, res) {
    if (req.query.token == process.env.KEY_API_SECRET) {
      let mensagem = {
        to_number: req.query.set_to,
        content: req.query.set_msg,
      };
      funcoes.enviarMensagem(mensagem);
      res.status(200).json("mensagem enviada com sucesso");
    } else {
      res
        .status(203)
        .json(
          "Acesso negado: Você não está autorizado a utilizar esse serviço"
        );
    }
  });
};
