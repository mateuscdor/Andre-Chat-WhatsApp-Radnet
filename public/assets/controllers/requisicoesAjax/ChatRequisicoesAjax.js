class ChatRequisicoesAjax {
  static carregarConversas(ip_servidor) {
    let resposta = null;
    var settings = {
      url: `${ip_servidor}/carregarConversas`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      resposta = response;
    });

    return resposta;
  }

  static pegarMensagens(ip_servidor, fones) {
    var settings = {
      url: `${ip_servidor}/recuperarMensagens?toNumber=${fones.from_number}&fromNumber=${fones.to_number}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static buscarProtocolo(ip_servidor, to_number) {
    let protocoloAtendimento = null;

    var settings = {
      url: `${ip_servidor}/buscarProtocolo?fone=${to_number}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      protocoloAtendimento = response;
    });

    return protocoloAtendimento;
  }

  static removerNotificacoes(ip_servidor, origemDestino) {
    var settings = {
      url: `${ip_servidor}/removerNotificacao?fone=${origemDestino}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static retornarSessao(ip_servidor, conectado) {
    let resposta = null;
    var settings = {
      url: `${ip_servidor}/retornarSessao?fone=${conectado}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      resposta = response;
    });

    return resposta;
  }

  static buscarProtocolo(ip_servidor, to_number) {
    let protocoloAtendimento = null;

    var settings = {
      url: `${ip_servidor}/buscarProtocolo?fone=${to_number}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      protocoloAtendimento = response;
    });

    return protocoloAtendimento;
  }

  static criarProtocolo(
    ip_servidor,
    session,
    to_number,
    protocoloNumero,
    author
  ) {
    var settings = {
      url: `${ip_servidor}/criarProtocolo?nome=${session}&contato=${to_number}&email&empresa&protocolo=${protocoloNumero}&situacao="aberto"&canal=${author}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static enviarMensagemInterna(
    ip_servidor,
    session,
    author,
    to_number,
    message,
    type,
    created_at,
    protocoloNumero
  ) {
    var settings = {
      url: `${ip_servidor}/enviarMensagemInterna?session=${session}&from_number=${author}&to_number=${to_number}&content=${message}&type=${type}&created_at=${created_at}&id_protocolo=${protocoloNumero}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static enviarMensagem(
    ip_servidor,
    session,
    author,
    to_number,
    message,
    type,
    created_at,
    protocoloNumero
  ) {
    var settings = {
      url: `${ip_servidor}/enviar?session=${session}&from_number=${author}&to_number=${to_number}&content=${message}&type=${type}&created_at=${created_at}&id_protocolo=${protocoloNumero}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static contarNotificacoes(ip_servidor) {
    let BDnotificacoes = null;

    var settings = {
      url: `${ip_servidor}/contarNotificacoes`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      BDnotificacoes = response;
    });

    return BDnotificacoes;
  }
}
