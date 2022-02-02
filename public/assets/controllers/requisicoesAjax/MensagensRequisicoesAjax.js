class MensagensRequisicoesAjax {
  static pegarMensagens(ip_servidor) {
    let mensagens = null;
    var settings = {
      url: `${ip_servidor}/pegarMensagensSistema`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      mensagens = response;
    });

    return mensagens;
  }
}
