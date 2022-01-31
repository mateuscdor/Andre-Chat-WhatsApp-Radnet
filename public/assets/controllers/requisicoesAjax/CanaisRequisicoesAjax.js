class CanaisRequisicoesAjax {
  static cadastrarCanal(ip_servidor, nome, numero, status) {
    var settings = {
      url: ` ${ip_servidor}/cadastrarCanal?nome=${nome}&fone=${numero}&status=${status}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static conectarCanal(ip_servidor, editarCanal) {
    let resposta = null;
    var settings = {
      url: `${ip_servidor}/conectar?sessao=${editarCanal.nome}&fone=${editarCanal.fone_anterior}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      resposta = response;
    });

    return resposta;
  }

  static desconectarCanal(ip_servidor, id) {
    var settings = {
      url: `${ip_servidor}/desconectarCanal?status=desconectado&fone=${id}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {});
  }

  static editarCanal(ip_servidor, nomeInput, foneInput, editarCanal) {
    var settings = {
      url: `${ip_servidor}/editarCanal?nome=${nomeInput}&fone=${foneInput}&fone_anterior=${editarCanal}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {});
  }

  static excluirCanal(ip_servidor, idCanal) {
    var settings = {
      url: `${ip_servidor}/excluirCanal?fone=${idCanal}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {});
  }

  static buscarCanais(ip_servidor) {
    let todosCanais = null;

    var settings = {
      url: `${ip_servidor}/buscarCanais`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      todosCanais = response;
    });

    return todosCanais;
  }
}
