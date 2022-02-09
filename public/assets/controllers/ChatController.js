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
    this.botoesTransferirAtendimento();
    this.removerAvisoModalTransferir();
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
          messages[index].type,
          messages[index].id_mensagem
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

      console.log(message);

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

      InserirUltimasMensagens.inserirUltimasMensagens(conversas);

      BDnotificacoes = ChatRequisicoesAjax.contarNotificacoes(ip_servidor);

      this.notificacoesBD = BDnotificacoes;

      // notificação
      if (numeroClicado == numeroDestinatario) {
        RenderMensagensChat.renderMensagensChat(
          message,
          "wppMessage",
          null,
          null,
          message.id_mensagem
        );
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
    let id_mensagem = null;

    /*
    const divResponder = document.querySelector("#responderMensagem");

    if (divResponder != null) {
    } else {
    }
    */

    //implementar uma funcionalidade para anexar o codigo das mensagem
    let responderMensagem = document.querySelector("#responderMensagem");

    if (responderMensagem != null) {
      console.log("existe uma responta");
    } else {
      console.log("não existe uma resposta");
    }

    var author = GuardarNumerosClicacos.retornarNumerosClicacos().conectado;
    var message = $("input[name=texto]").val();
    var to_number = GuardarNumerosClicacos.retornarNumerosClicacos().cliente;

    let mensagensInternas = document.querySelector(".mensagens-internas");

    let mensagensInternasAtivado =
      mensagensInternas.classList.contains("ativado");

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
        id_mensagem = ChatRequisicoesAjax.enviarMensagem(
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
          type,
          id_mensagem.id
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

  copiarmensagemChat(div) {
    let copy =
      div.parentNode.parentNode.parentNode.parentNode.children[0].children[1];

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(copy).text().trim()).select();
    document.execCommand("copy");
    $temp.remove();

    toastr.success("Mensagem copiada para área de tranferência");
  }

  responderMensagemChat(div) {
    const divResponder = $(".responder");
    divResponder.empty();

    RenderResponder.renderResponder(
      $(div.parentNode.parentNode.parentNode.parentNode.children[0].children[1])
        .text()
        .trim()
    );
  }

  fecharResponder() {
    const divResponder = $(".responder");
    divResponder.empty();
  }

  opcoesMouseover(div) {
    if (div.children[0].className == "botoes") {
      div.children[0].style.visibility = "visible";
    } else {
      div.children[1].style.visibility = "visible";
    }
  }

  opcoesMouseout(div) {
    if (div.children[0].className == "botoes") {
      div.children[0].style.visibility = "hidden";
    } else {
      div.children[1].style.visibility = "hidden";
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

    $(selectCanais).empty();

    canais.forEach((element) => {
      let canaisInserir = `   
        <option value="${element.fone}">${element.nome} - ${element.fone}</option>
         `;

      $(selectCanais).append(canaisInserir);
    });
  }

  botoesTransferirAtendimento() {
    let modalPessoa = document.querySelector(".modalPessoa");

    let atendentes = ChatRequisicoesAjax.buscarAtendentesDisponiveis(
      this.ip_servidor
    );

    let templatePessoa =
      RenderTransferirAtendimentoPessoa.renderTransferirAtendimentoPessoa();

    $(document).ready(function () {
      $(modalPessoa).append(templatePessoa);
      let selectAtendentes = document.querySelector("#inputGroupSelect01");

      for (let index = 0; index < atendentes.length; index++) {
        $(selectAtendentes).append(
          `<option value="${atendentes[index].nome}">${atendentes[index].nome}  - ${atendentes[index].nivel_acesso}</option>`
        );
      }
    });
  }

  btnPessoaTransferenciaAtendimento() {
    let btnPessoa = document.querySelector("#botaoPessoa");
    let btnDepartamento = document.querySelector("#botaoDepartamento");
    let modalPessoa = document.querySelector(".modalPessoa");

    let templatePessoa =
      RenderTransferirAtendimentoPessoa.renderTransferirAtendimentoPessoa();

    let templateDepartamento =
      RenderTransferirAtendimentoDepartamento.renderTransferirAtendimentoDepartamento();

    let atendentes = ChatRequisicoesAjax.buscarAtendentesDisponiveis(
      this.ip_servidor
    );

    if (!btnPessoa.classList.contains("btn-primary")) {
      btnPessoa.classList.remove("btn-light");
      btnPessoa.classList.add("btn-primary");

      btnDepartamento.classList.remove("btn-primary");
      btnDepartamento.classList.add("btn-light");

      $(modalPessoa).append(templatePessoa);
      $(".templateDepartamento").remove();

      let selectAtendentes = document.querySelector("#inputGroupSelect01");

      for (let index = 0; index < atendentes.length; index++) {
        $(selectAtendentes).append(
          `<option value="${atendentes[index].nome}">${atendentes[index].nome}  - ${atendentes[index].nivel_acesso}</option>`
        );
      }
    }
  }

  btnDepartamentoTransferenciaAtendimento() {
    let btnPessoa = document.querySelector("#botaoPessoa");
    let btnDepartamento = document.querySelector("#botaoDepartamento");
    let modalDepartamento = document.querySelector(".modalDepartamento");

    let departamentos = ChatRequisicoesAjax.buscarDepartamento(
      this.ip_servidor
    );

    let templateDepartamento =
      RenderTransferirAtendimentoDepartamento.renderTransferirAtendimentoDepartamento();

    if (!btnDepartamento.classList.contains("btn-primary")) {
      btnDepartamento.classList.remove("btn-light");
      btnDepartamento.classList.add("btn-primary");

      btnPessoa.classList.remove("btn-primary");
      btnPessoa.classList.add("btn-light");

      $(modalDepartamento).append(templateDepartamento);
      $(".templatePessoa").remove();

      let selectDepartamentos = document.querySelector("#inputGroupSelect01");

      for (let index = 0; index < departamentos.length; index++) {
        $(selectDepartamentos).append(
          `<option value="${departamentos[index].departamento}">${departamentos[index].departamento} </option>`
        );
      }
    }
  }

  transferirAtendimento() {
    let aviso = document.querySelector(".avisoPreencher");
    let avisoColocar = `
    <p class="text-center bg-danger text-light p-1" id="avisoPreencher">
    <strong>Preencha com a Pesssoa/Departamento para transferência</strong>
    </p>
    `;

    let select = $("#inputGroupSelect01 :selected").val();
    let mensagem = $("#mensagemTransferencia").val();

    if (select == "") {
      if (aviso.children.length === 0) {
        $(aviso).append(avisoColocar);
      } else {
        console.log("contem aviso");
      }
    } else {
      let atendimento = {
        cliente: GuardarNumerosClicacos.retornarNumerosClicacos().cliente,
        requerente: GuardarNumerosClicacos.retornarNumerosClicacos().conectado,
        destino: select,
        mensagem: mensagem,
        status: "aberta",
      };

      ChatRequisicoesAjax.criarTransferenciaAtendimentoAjax(
        this.ip_servidor,
        atendimento
      );

      $("#exampleModal3").modal("hide");
      $(aviso).empty();
      toastr.success("Transferencia feita com sucesso");
    }

    //essa funcionalidade está enviando varios avisos devido ao fato de ter varios selects com mesmo id
  }

  removerAvisoModalTransferir() {
    let aviso = document.querySelector(".avisoPreencher");

    document.querySelectorAll(".btnCancelar").forEach((item) => {
      item.addEventListener("click", () => {
        $(aviso).empty();
        $("#inputGroupSelect01").prop("selectedIndex", 0);
      });
    });
  }

  carregarInformacoesClienteModal() {
    let perfilCliente = document.querySelector("#perfilCliente");

    perfilCliente.addEventListener("click", () => {
      let infoCliente = ChatRequisicoesAjax.pesquisarEnderecoClienteAjax(
        this.ip_servidor,
        GuardarNumerosClicacos.retornarNumerosClicacos().cliente
      );

      if (!infoCliente.length) {
        let nomeCliente = (document.querySelector(
          "[name='nomeCliente']"
        ).value = GuardarNumerosClicacos.retornarNumerosClicacos().cliente);

        let contatoCliente = (document.querySelector(
          "[name='contatoCliente']"
        ).value = GuardarNumerosClicacos.retornarNumerosClicacos().cliente);
      } else {
        let endereco = ChatRequisicoesAjax.pesquisarEnderecoAjax(
          this.ip_servidor,
          infoCliente[0].id_endereco
        );

        document.querySelector("[name='cepCliente']").value = endereco[0].cep;
        document.querySelector("[name='bairroCliente']").value =
          endereco[0].bairro;
        document.querySelector("[name='cidadeCliente']").value =
          endereco[0].cidade;
        document.querySelector("[name='complementoCliente']").value =
          endereco[0].complemento;
        document.querySelector("[name='estadoCliente']").value =
          endereco[0].estado;
        document.querySelector("[name='logradouroCliente']").value =
          endereco[0].logradouro;
        document.querySelector("[name='numeroCliente']").value =
          endereco[0].numero;
        document.querySelector("[name='paisCliente']").value = endereco[0].pais;
        console.log(endereco);

        let cliente = ChatRequisicoesAjax.pesquisarClienteAjax(
          this.ip_servidor,
          infoCliente[0].id_cliente
        );

        document.querySelector("[name='nomeCliente']").value = cliente[0].nome;
        document.querySelector("[name='contatoCliente']").value =
          cliente[0].contato;
        document.querySelector("[name='segundoContatoCliente']").value =
          cliente[0].segundoContato;
        document.querySelector("[name='emailCliente']").value =
          cliente[0].email;
        document.querySelector("[name='empresaCliente']").value =
          cliente[0].empresa;
        document.querySelector("[name='anotacoesCliente']").value =
          cliente[0].anotacoes;
      }
    });
  }

  atualizarInformacoesCliente() {
    let modalInfoCliente = document.querySelector("#salvarInfoCliente");

    modalInfoCliente.addEventListener("click", () => {
      let gravarCliente = {
        nome: $("[name='nomeCliente']").val(),
        segundoContato: $("[name='segundoContatoCliente']").val(),
        email: $("[name='emailCliente']").val(),
        empresa: $("[name='empresaCliente']").val(),
        anotacoes: $("[name='anotacoesCliente']").val(),
      };

      let cliente = {
        nome: $("[name='nomeCliente']").val(),
        contato: $("[name='contatoCliente']").val(),
        segundoContato: $("[name='segundoContatoCliente']").val(),
        email: $("[name='emailCliente']").val(),
        empresa: $("[name='empresaCliente']").val(),
        anotacoes: $("[name='anotacoesCliente']").val(),
      };

      let gravarEndereco = {
        cep: $("[name='cepCliente']").val(),
        logradouro: $("[name='logradouroCliente']").val(),
        numero: $("[name='numeroCliente']").val(),
        bairro: $("[name='bairroCliente']").val(),
        complemento: $("[name='complementoCliente']").val(),
        cidade: $("[name='cidadeCliente']").val(),
        estado: $("[name='estadoCliente']").val(),
        pais: $("[name='paisCliente']").val(),
      };

      let infoCliente = ChatRequisicoesAjax.pesquisarEnderecoClienteAjax(
        this.ip_servidor,
        cliente.contato
      );

      if (!infoCliente.length) {
        let idEndereco = ChatRequisicoesAjax.criarEnderecoAjax(
          this.ip_servidor,
          gravarEndereco
        );

        cliente.id_endereco = idEndereco.insertId;

        let idCliente = ChatRequisicoesAjax.criarClienteAjax(
          this.ip_servidor,
          cliente
        );

        ChatRequisicoesAjax.criarClienteEnderecoAjax(
          ip_servidor,
          idCliente.insertId,
          idEndereco.insertId,
          cliente.contato
        );

        $("#exampleModal5").modal("hide");
      } else {
        gravarCliente.id_endereco = infoCliente[0].id_endereco;

        ChatRequisicoesAjax.atualizarClienteAjax(
          ip_servidor,
          infoCliente[0].id_cliente,
          gravarCliente
        );

        ChatRequisicoesAjax.atualizarEnderecoAjax(
          ip_servidor,
          infoCliente[0].id_endereco,
          gravarEndereco
        );

        $("#exampleModal5").modal("hide");
      }
    });
  }

  retornarSocket() {
    return this.socket;
  }

  //dar continuidade a parte de carregamento de informações do cliente
}
