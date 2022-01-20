class AtendenteController {
  constructor() {}

  cadastrarAtendente(event) {
    event.preventDefault();

    let nome = $("input[name=primeiro-nome]").val();
    let sobrenome = $("input[name=segundo-nome]").val();
    let email = $("input[name=email]").val();
    let senha = $("input[name=senha]").val();
    let setor = $("#setor :selected").val();

    AtendenteRequisicoesAjax.cadastrarAtendenteAjax(
      ip_servidor,
      nome,
      sobrenome,
      email,
      senha,
      setor
    );

    document.location.reload(true);
  }

  excluirAtendente(event, id) {
    AtendenteRequisicoesAjax.excluirAtendenteAjax(ip_servidor, id);

    window.location.href = "/atendentes";
  }
}
