class ChatRequisicoesAjax {
  static atualizarClienteAjax(ip_servidor, id, cliente) {
    var settings = {
      url: `${ip_servidor}/atualizarCliente?id=${id}&nome=${cliente.nome}&segundoContato=${cliente.segundoContato}&email=${cliente.email}&empresa=${cliente.empresa}&anotacoes=${cliente.anotacoes}&id_endereco=${cliente.id_endereco}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static atualizarEnderecoAjax(ip_servidor, id, endereco) {
    var settings = {
      url: `${ip_servidor}/atualizarEndereco?id=${id}&cep=${endereco.cep}&logradouro=${endereco.logradouro}&numero=${endereco.numero}&complemento=${endereco.complemento}&cidade=${endereco.cidade}&estado=${endereco.estado}&pais=${endereco.pais}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  static buscarAtendentesDisponiveis(ip_servidor) {
    let atendentes = null;

    var settings = {
      url: `${ip_servidor}/buscarTodosAtendentes`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      atendentes = response;
    });

    return atendentes;
  }

  static buscarCanais(ip_servidor) {
    let canais = null;

    var settings = {
      url: `${ip_servidor}/buscarCanaisAtivos`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      canais = response;
    });

    return canais;
  }

  static buscarDepartamento(ip_servidor) {
    let departamentos = null;

    var settings = {
      url: `${ip_servidor}/buscarDepartamentos`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      departamentos = response;
    });

    return departamentos;
  }

  static buscarEnderecoCep(cep) {
    let endereco = null;

    var settings = {
      url: `viacep.com.br/ws/${cep}/json/`,
      method: "GET",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      endereco = response;
    });

    return endereco;
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

  static carregarConversas(ip_servidor) {
    let resposta = [];
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

  static criarClienteAjax(ip_servidor, cliente) {
    let idCliente = null;

    var settings = {
      url: `${ip_servidor}/criarCliente?nome=${cliente.nome}&contato=${cliente.contato}&segundoContato=${cliente.segundoContato}&email=${cliente.email}&empresa=${cliente.empresa}&anotacoes=${cliente.anotacoes}&id_endereco=${cliente.id_endereco}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      idCliente = response;
    });

    return idCliente;
  }

  static criarEnderecoAjax(ip_servidor, endereco) {
    let id_insert = null;
    var settings = {
      url: `${ip_servidor}/criarEndereco?cep=${endereco.cep}&logradouro=${endereco.logradouro}&numero=${endereco.numero}&bairro=${endereco.bairro}&complemento=${endereco.complemento}&cidade=${endereco.cidade}&estado=${endereco.estado}&pais=${endereco.pais}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      id_insert = response;
    });

    return id_insert;
  }

  static criarClienteEnderecoAjax(ip_servidor, idCliente, idEndereco, contato) {
    var settings = {
      url: `${ip_servidor}/criarClienteEndereco?id_cliente=${idCliente}&id_endereco=${idEndereco}&contato=${contato}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
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

  static criarTransferenciaAtendimentoAjax(ip_servidor, atendimento) {
    var settings = {
      url: `${ip_servidor}/transferirAtendimento?cliente=${atendimento.cliente}&requerente=${atendimento.requerente}&destino=${atendimento.destino}&mensagem=${atendimento.mensagem}&status=${atendimento.status}`,
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

  static pesquisarEnderecoClienteAjax(ip_servidor, contato) {
    let infoCliente = null;
    var settings = {
      url: `${ip_servidor}/pesquisarEnderecoCliente?contato=${contato}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      infoCliente = response;
    });
    return infoCliente;
  }

  static pesquisarEnderecoAjax(ip_servidor, id) {
    let endereco = null;
    var settings = {
      url: `${ip_servidor}/pesquisarEndereco?id=${id}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      endereco = response;
    });

    return endereco;
  }

  static pesquisarClienteAjax(ip_servidor, id) {
    let cliente = null;
    var settings = {
      url: `${ip_servidor}/pesquisarCliente?id=${id}`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      cliente = response;
    });

    return cliente;
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
}
