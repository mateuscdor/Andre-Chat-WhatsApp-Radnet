const superchats = require("superchats");
const Chat = require("../models/chat");
const moment = require("moment");
const { mensagem } = require("../models/chat");
const Protocolo = require("../models/protocolos");
const Notificacoes = require("../models/notificacoes");
const Canais = require("../models/canais");
require("dotenv").config();

class Funcoes {
  whatsapp = null;
  socket = null;
  io = null;
  base64QR = null;
  usuarioLogado = null;
  status = null;

  conectar(sessao, fone) {
    return new Promise((resolve, reject) => {
      try {
        console.log("functions conectar");

        superchats
          .create(
            sessao,

            {
              license: process.env.SUPER_TOKEN,
              multidevice: true,
              welcomeScreen: false,
              connectTest: 10_000,
              logQr: false,
            },
            (base64QR) => {
              this.base64QR = base64QR;
              if (base64QR) {
                resolve(base64QR);
              }
            },
            async (statusSession) => {
              console.log("Status Session:", statusSession);
              if (statusSession.response == "isLogged") {
                console.log("entrou aqui");
                await Canais.editarStatus("conectado", fone);
                this.status = "conectado";
                resolve("conectado");
              }
              if (statusSession.response == "isConnected") {
                console.log("entrou aqui");
                await Canais.editarStatus("conectado", fone);
                this.status = "conectado";
                resolve("conectado");
              }
            }
          )
          .then(async (client) => {
            this.whatsapp = client;

            /*
            if (this.status == "conectado") {
              client.forceStatusOn();
            }
            */

            await client.onMessage(async (event) => {
              console.log(event);

              let dataAtual = moment
                .unix(event.timestamp)
                .format("YYYY-MM-DD HH:mm:ss");

              let dataProtocolo = moment
                .unix(event.timestamp)
                .format("DDMMYYYYHHmmsss");

              let protocolo = await Protocolo.buscarProtocolos(event.from);

              if (!protocolo.length) {
                await Protocolo.criarProtocolo({
                  nome: event.session,
                  contato: event.from,
                  email: null,
                  empresa: null,
                  protocolo: dataProtocolo,
                  situacao: "aberto",
                  canal: event.device,
                });
              }

              if (!protocolo.length) {
                const mensagem = {
                  session: event.session,
                  from_number: event.from,
                  to_number: event.device,
                  content: event.content,
                  type: "chat",
                  created_at: dataAtual,
                  id_protocolo: dataProtocolo,
                  id_mensagem: event.id,
                };

                Chat.mensagem(mensagem);
              } else {
                const mensagem = {
                  session: event.session,
                  from_number: event.from,
                  to_number: event.device,
                  content: event.content,
                  type: "chat",
                  created_at: dataAtual,
                  id_protocolo: protocolo[0].protocolo,
                  id_mensagem: event.id,
                };

                Chat.mensagem(mensagem);
              }

              Notificacoes.inserirNotificacao({ fone: event.from });

              this.io.sockets.emit("wppMessage", {
                author: event.from,
                message: event.content,
                horario: event.dataAtual,
                id_mensagem: event.id,
              });
            });

            await client.onAck((event) => {
              console.log(event);
            });

            await client.onPresence((event) => {
              console.log(event);
            });

            await client.onDelete((event) => {
              console.log(event);
            });
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  enviarMensagem(message) {
    return new Promise((resolve, reject) => {
      try {
        console.log("functions enviarMensagem");

        resolve(this.whatsapp.sendText(message.to_number, message.content));
      } catch (error) {
        reject(error);
      }
    });
  }

  enviarMensagemDocumento(message) {
    return new Promise((resolve, reject) => {
      try {
        console.log("functions enviar Mensagem Documento");

        resolve(this.whatsapp.decryptFileSave(message, "./files/teste4.pdf"));
      } catch (error) {
        reject(error);
      }
    });
  }

  enviarImagem(fone, url, text) {
    return new Promise((resolve, reject) => {
      try {
        console.log("functions enviar Imagem");

        resolve(this.whatsapp.sendImage(fone, url, text));
      } catch (error) {
        reject(error);
      }
    });
  }

  encaminharMensagem(message) {
    return new Promise((resolve, reject) => {
      try {
        console.log("functions encaminhar Mensagem");

        resolve(
          this.whatsapp.forwardMessage(
            message.number_from,
            message.id,
            message.number_to
          )
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  enviarDocumento(requisicao) {
    console.log("functions enviarDocumento");
    if (this.whatsapp) {
      return this.whatsapp.sendDocument(
        requisicao.phone,
        requisicao.documento,
        requisicao.nome
      );
    }
  }

  inserirUsuarioLogado(usuario) {
    this.usuarioLogado = usuario;
  }

  retornarUsuarioLogado() {
    return this.usuarioLogado;
  }

  logout() {
    console.log("functions logout");
    if (this.whatsapp) {
      //this.whatsapp.logout();
      this.whatsapp.close();
    }
  }

  consoleConectado(socket, io) {
    console.log("functions consoleConectado");
    this.socket = socket;
    this.io = io;
    console.log(`Socket contectado: ${socket.id}`);
  }

  mensagensAnteriores(messages) {
    return new Promise((resolve, reject) => {
      try {
        console.log("functions mensagensAnteriores");
        let socketAtual = this.socket;
        let mensagem = [];

        messages.forEach(function (message, i) {
          mensagem.push({
            author: message.from_number,
            message: message.content,
            data: message.created_at,
            type: message.type,
            id_mensagem: message.id_mensagem,
          });

          console.log(mensagem[i]);
        });

        resolve(resolve);

        socketAtual.emit("previousMessages", mensagem);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Funcoes();
