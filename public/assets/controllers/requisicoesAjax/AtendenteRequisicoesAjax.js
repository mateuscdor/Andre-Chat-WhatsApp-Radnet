class AtendenteRequisicoesAjax {
  static cadastrarAtendenteAjax(
    ip_servidor,
    nome,
    sobrenome,
    email,
    senha,
    setor
  ) {
    var settings = {
      url: `${ip_servidor}/atendentes-cadastrar?nome=${nome}&sobrenome=${sobrenome}&email=${email}&senha=${senha}&nivel_acesso=${setor}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static excluirAtendenteAjax(ip_servidor, id) {
    var settings = {
      url: `${ip_servidor}/excluir-atendente?id=${id}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static atualizarAtendente(ip_servidor, atendente) {
    var settings = {
      url: `${ip_servidor}/atualizar-atendente?nome=${atendente.nome}&sobrenome=${atendente.sobrenome}&email=${atendente.email}&senha=${atendente.senha}&nivel_acesso=${atendente.nivel_acesso}&status=${atendente.status}&usuario=${atendente.usuario}&id=${atendente.id}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }
}
