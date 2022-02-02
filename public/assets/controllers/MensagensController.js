class MensagensController {
  constructor() {
    this.section = document.querySelector("#renderizarSection");
    $(this.section).empty();
    $(this.section).append(RenderMensagens.renderInicio());
  }

  renderInicio(event) {
    event.preventDefault();
    $(this.section).empty();
    $(this.section).append(RenderMensagens.renderInicio());
  }

  mouseover(element) {
    element.classList.add("animacao");
  }

  mouseout(element) {
    element.classList.remove("animacao");
  }

  renderAutomaticas(event) {
    event.preventDefault();
    $(this.section).empty();
    $(this.section).append(RenderMensagens.renderAutomaticas());
  }
  renderFilaDeEnvio(event) {
    event.preventDefault();
    $(this.section).empty();
    $(this.section).append(RenderMensagens.renderFilaDeEnvio());
  }
  renderModelos(event) {
    event.preventDefault();
    $(this.section).empty();
    $(this.section).append(RenderMensagens.renderModelos());

    let mensagens = MensagensRequisicoesAjax.pegarMensagens(ip_servidor);
    console.log(mensagens);
    let mensagensTabela = document.querySelector(".mensagensTabela");

    mensagens.forEach((element) => {
      $(mensagensTabela).append(RenderMensagens.inserirMensagens(element));
    });
  }
}
