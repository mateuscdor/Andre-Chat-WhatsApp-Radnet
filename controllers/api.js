const funcoes = require("../funcoes/funcoes");
const authKey = require("../middlewares/authKey");
require("dotenv").config();

module.exports = (app) => {
  app.get("/api/enviar-mensagem", authKey, async function (req, res) {
    let mensagem = {
      to_number: req.query.set_to,
      content: req.query.set_msg,
    };

    funcoes.enviarMensagem(mensagem);

    let arrayMensagem = mensagem.content.split(" ");

    //console.log(arrayMensagem);
    // console.log(arrayMensagem[1].substring(0, arrayMensagem[1].length - 1));

    /*
        let documento = {
      phone: req.query.phone,
      documento: req.query.documento,
      nome: req.query.nome,
    };
    funcoes.enviarDocumento(documento);
    */

    res.status(200).json("Mensagem enviada com sucesso");
  });

  app.get("/api/enviar-arquivo", authKey, async function (req, res) {
    let documento = {
      phone: req.query.phone,
      documento: req.query.documento,
      nome: req.query.nome,
    };
    funcoes.enviarDocumento(documento);
    res.status(200).json("Arquivo enviado com sucesso");
  });
};
