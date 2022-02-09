class HeaderController {
  constructor() {
    this.pegarUsuarioLogado();
  }

  pegarUsuarioLogado() {
    let usuario = null;

    usuario = HeaderRequisicoesAjax.pegarUsuarioLogado(ip_servidor);
    console.log(usuario);

    $("#usuarioSistema").append(`<span>${usuario[0].nome}</span>`);
    document.querySelector("#usuarioSistema").href = `/perfil/${usuario[0].id}`;
    if (usuario[0].caminho_avatar != null || usuario[0].caminho_avatar != "") {
      let imgUsuario = document.querySelector("#imageUsuario");
      imgUsuario.setAttribute("src", `${usuario[0].caminho_avatar}`);
      /*
      $(".image").empty();
   
      */
    }
  }
}
