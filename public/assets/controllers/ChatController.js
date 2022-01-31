class ChatController {
  constructor(ip_servidor) {
    this.socket = null;
    this.notificacoesBanco = null;
    this.conectarSocketIo(ip_servidor);
    this.telaChat = document.querySelector("#tela-chat");
    this.telaChat.style.visibility = "hidden";
    this.ip_servidor = ip_servidor;
    this.conversas = ChatRequisicoesAjax.carregarConversas(this.ip_servidor);
    InserirUltimasMensagens.inserirUltimasMensagens(this.conversas);
  }

  conectarSocketIo(ip_servidor) {
    this.socket = io(ip_servidor);

    this.socket.on("previousMessages", function (messages) {
      console.log("socket / previousMessages");

      const div = $("#mensagens-chat");
      div.empty();

      for (let index = 0; index < messages.length; index++) {
        RenderMensagensChat.renderMensagensChat(
          messages[index],
          "funcionario",
          GuardarNumerosClicacos.retornarNumerosClicacos().conectado,
          messages[index].type
        );
      }
    });

    this.socket.on("sendMessage", (data) => {
      console.log(data);
      //socket.broadcast.emit("receivedMessage", data);
      socket.emit("receivedMessage", data);
    });

    this.socket.on("wppMessage", function (message) {
      console.log("socket / wppmessage");

      let numeroDestinatario = message.author;
      let numeroClicado = null;
      let BDnotificacoes;

      if (GuardarNumerosClicacos.retornarNumerosClicacos() == null) {
        numeroClicado = null;
      } else {
        numeroClicado =
          GuardarNumerosClicacos.retornarNumerosClicacos().cliente;
      }

      // limpa chat
      const div = $("#conversas-chat");
      div.empty();

      let conversas = ChatRequisicoesAjax.carregarConversas(ip_servidor);
      console.log(conversas);

      InserirUltimasMensagens.inserirUltimasMensagens(conversas);

      BDnotificacoes = ChatRequisicoesAjax.contarNotificacoes(ip_servidor);

      this.notificacoesBD = BDnotificacoes;

      // notificação
      if (numeroClicado == numeroDestinatario) {
        RenderMensagensChat.renderMensagensChat(message, "wppMessage");
      } else {
        let notificacoes = document.querySelectorAll(".clientesConversa");

        notificacoes.forEach((element) => {
          // Por padrão ele vem com o valor 1

          for (let index = 0; index < this.notificacoesBD.length; index++) {
            const toFromId = element.id.split("-");

            if (toFromId.includes(this.notificacoesBD[index].fone)) {
              $(element).append(
                RenderNotificacaoChat.renderNotificacaoChat(
                  this.notificacoesBD[index].notificacoes
                )
              );
            }
          }
        });
      }
      ExecutarAudioRecebimento.executarAudioRecebimento();
    });
  }

  enviarMensagem(event) {
    event.preventDefault();

    let resposta = null;
    let protocoloCliente = null;

    var author = GuardarNumerosClicacos.retornarNumerosClicacos().conectado;
    var message = $("input[name=texto]").val();
    var to_number = GuardarNumerosClicacos.retornarNumerosClicacos().cliente;

    let mensagensInternas = document.querySelector(".mensagens-internas");

    console.log(mensagensInternas);

    let mensagensInternasAtivado =
      mensagensInternas.classList.contains("ativado");

    console.log(mensagensInternasAtivado);

    var created_at = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
    var conectado = GuardarNumerosClicacos.retornarNumerosClicacos().conectado;
    var protocoloNumero = moment(new Date().getTime()).format(
      "DDMMYYYYHHmmsss"
    );

    resposta = ChatRequisicoesAjax.retornarSessao(this.ip_servidor, conectado);
    var session = resposta[0].nome;

    protocoloCliente = ChatRequisicoesAjax.buscarProtocolo(
      ip_servidor,
      to_number
    );

    if (!protocoloCliente.length) {
      //criarProtocolo

      ChatRequisicoesAjax.criarProtocolo(
        ip_servidor,
        session,
        to_number,
        protocoloNumero,
        author
      );

      if (mensagensInternasAtivado === true) {
        var type = "interno";

        ChatRequisicoesAjax.enviarMensagemInterna(
          ip_servidor,
          session,
          author,
          to_number,
          message,
          type,
          created_at,
          protocoloNumero
        );
      } else {
        var type = "chat";

        ChatRequisicoesAjax.enviarMensagem(
          ip_servidor,
          session,
          author,
          to_number,
          message,
          type,
          created_at,
          protocoloNumero
        );
      }

      document.getElementById("buscar").value = "";

      let notificacoes = document.querySelector(".notificacoes");

      if (notificacoes.classList.contains("text-danger")) {
      } else {
        let audio = new Audio("assets/audios/envio.mp3");

        audio.play();
      }
    } else {
      if (mensagensInternasAtivado === true) {
        var type = "interna";

        ChatRequisicoesAjax.enviarMensagemInterna(
          ip_servidor,
          session,
          author,
          to_number,
          message,
          type,
          created_at,
          protocoloCliente[0].protocolo
        );
      } else {
        var type = "chat";

        // enviar
        ChatRequisicoesAjax.enviarMensagem(
          ip_servidor,
          session,
          author,
          to_number,
          message,
          type,
          created_at,
          protocoloCliente[0].protocolo
        );
      }

      if (message.length) {
        var messageObject = {
          author: conectado,
          message: message,
          session: resposta[0].nome,
        };

        RenderMensagensChat.renderMensagensChat(
          messageObject,
          "browser",
          conectado,
          type
        );

        this.socket.emit("sendMessage", messageObject);
      }

      document.getElementById("buscar").value = "";

      let notificacoes = document.querySelector(".notificacoes");

      if (notificacoes.classList.contains("text-danger")) {
      } else {
        let audio = new Audio("assets/audios/envio.mp3");

        audio.play();
      }
    }
  }
  mensagensInternas(event, div) {
    let mensagensInternas = div;

    let icon = document.querySelector(".mensagens-internas");

    if (mensagensInternas.style.color == "") {
      mensagensInternas.style.backgroundColor = "#1C98DA";
      mensagensInternas.style.color = "#fff";
      mensagensInternas.style.borderRadius = "6px";
      icon.classList.add("ativado");
      icon.classList.remove("desativado");
    } else {
      mensagensInternas.style.backgroundColor = "";
      mensagensInternas.style.color = "";
      mensagensInternas.style.borderRadius = "";
      icon.classList.add("desativado");
      icon.classList.remove("ativado");
    }
  }

  iniciarNovoAtendimento(event, div) {
    let sessao = null;
    let canal = $("#selectCanal :selected").val();
    let fone = $("#inputFone").val();
    let texto = $("#floatingTextarea2").val();
    let created_at = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
    let protocolo = moment(new Date().getTime()).format("YYYYMMDDHHmmsss");

    if (
      canal == "Selecione uma opção" ||
      fone == "Selecione uma opção" ||
      texto == ""
    ) {
      toastr.error(`Complete com todas as informações do formulário`);
    } else {
      sessao = ChatRequisicoesAjax.retornarSessao(ip_servidor, canal);
      let data = created_at;
      let id_protocolo = protocolo;
      ChatRequisicoesAjax.criarProtocolo(
        ip_servidor,
        sessao[0].nome,
        fone,
        id_protocolo,
        canal
      );

      try {
        ChatRequisicoesAjax.enviarMensagem(
          ip_servidor,
          sessao[0].nome,
          canal,
          fone,
          texto,
          "chat",
          data,
          id_protocolo
        );
      } catch (error) {
        console.log("erro no envio");
      }

      $("#exampleModal").modal("hide");

      document.location.reload(true);
    }
  }

  inserirCanais(event) {
    let canais = [];

    canais = ChatRequisicoesAjax.buscarCanais(ip_servidor);

    let selectCanais = document.querySelector(".selectCanal");

    canais.forEach((element) => {
      let canaisInserir = `   
        <option value="${element.fone}">${element.nome} - ${element.fone}</option>
         `;

      $(selectCanais).append(canaisInserir);
    });
  }

  retornarSocket() {
    return this.socket;
  }
}
