const funcoes = require("../funcoes/funcoes");
const authKey = require("../middlewares/authKey");
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const puppeteer = require("puppeteer");

module.exports = (app) => {
  app.get("/api/enviar-mensagem", authKey, async function (req, res) {
    let mensagem = {
      to_number: req.query.set_to,
      content: req.query.set_msg,
    };
    /*
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://177.128.184.20/boleto/347882-DRF29CE53N/");

      //await browser.close();
    })();
*/
    /*
    const browser = await puppeteer.launch();

    const webPage = await browser.newPage();

    const url = "https://google.com";

    await webPage.goto(url, {
      waitUntil: "networkidle0",
    });

    await webPage.pdf({
      printBackground: true,
      path: "public/assets/uploads/webpage.pdf",
      format: "Letter",
      margin: {
        top: "20px",
        bottom: "40px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();
*/
    /*
    let url = "https://radnet.c.sgp.net.br/boleto/347882-DRF29CE53N";
    let dest = "public/assets/uploads/teste.pdf";

    const download = function (url) {
      const file = fs.createWriteStream(dest);

      https.get(url, function (response) {
        response.pipe(file);
        file.on("finish", function () {
          file.close();
        });
      });
    };

    */

    //download(url, dest);

    /*
     */
    //console.log("ok");

    funcoes.enviarMensagem(mensagem);

    /*
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
        nome: "boleto.pdf",
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

    */
    res.status(200).json("Arquivo enviado com sucesso");
  });
};
