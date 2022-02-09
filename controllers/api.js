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

    let arrayMensagem = req.query.set_msg.split(" ");
    let link = null;
    for (let index = 0; index < arrayMensagem.length; index++) {
      console.log(arrayMensagem[index]);
      if (arrayMensagem[index].indexOf("http") > -1) {
        if (
          arrayMensagem[index].substring(
            arrayMensagem[index].length - 1,
            arrayMensagem[4].length
          ) == "." ||
          arrayMensagem[index].substring(
            arrayMensagem[index].length - 1,
            arrayMensagem[4].length
          ) == ","
        ) {
          link = arrayMensagem[index].substring(0, arrayMensagem[4].length - 1);
        } else {
          link = arrayMensagem[index];
        }
      }
    }

    if (link != "" || link != null) {
      let documento = {
        phone: req.query.set_to,
        documento: link,
        nome: "boleto-" + link + ".pdf",
      };
      funcoes.enviarDocumento(documento);
    }

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
