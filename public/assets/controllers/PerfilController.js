class PerfilController {
  constructor() {}

  excluirAtendente(event, id) {
    AtendenteRequisicoesAjax.excluirAtendenteAjax(ip_servidor, id);

    window.location.href = "/atendentes";
  }

  atualizarAtendente(event, id) {
    var nome = $("input[name=nome]").val();
    var sobrenome = $("input[name=sobrenome]").val();
    var email = $("input[name=email]").val();
    var login = $("input[name=login]").val();
    var senha = $("input[name=senha]").val();
    var nivel_acesso = $("input[name=nivel_acesso]").val();
    var status = $("input[name=status]").val();

    let atendente = {
      id: id,
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      usuario: login,
      senha: senha,
      nivel_acesso: nivel_acesso,
      status: status,
    };

    AtendenteRequisicoesAjax.atualizarAtendente(ip_servidor, atendente);

    window.location.href = "/atendentes";
  }
}
