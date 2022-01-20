class CanaisController {
  constructor() {
    this.idExcluir = null;
    this.idEditar = null;
    this.foneConectar = null;
  }

  cadastrarCanal(event, div) {
    event.preventDefault();

    var nome = $("input[name=nome]").val();
    var numero = $("input[name=numero]").val();
    var status = "desconectado";

    CanaisRequisicoesAjax.cadastrarCanal(ip_servidor, nome, numero, status);

    document.location.reload(true);
  }

  excluirCanal(event, div) {
    event.preventDefault();

    this.idExcluir = div.id;
  }

  confirmarExcluir() {
    CanaisRequisicoesAjax.excluirCanal(ip_servidor, this.idExcluir);

    document.location.reload(true);
  }

  editarCanal(event, div) {
    const canalArray = div.id.split("-");

    this.idEditar = {
      nome: canalArray[0],
      fone_anterior: canalArray[1],
    };
  }

  confirmarAtualizar() {
    var nomeEditar = document.querySelector("#editar-nome");
    let nomeInput = nomeEditar.value;
    var foneEditar = document.querySelector("#editar-numero");
    let foneInput = foneEditar.value;

    CanaisRequisicoesAjax.editarCanal(
      ip_servidor,
      nomeInput,
      foneInput,
      this.idEditar.fone_anterior
    );

    document.location.reload(true);
  }

  conectar(event, div) {
    event.preventDefault();

    const canalArray = div.id.split("-");

    this.foneConectar = {
      nome: canalArray[0],
      fone_anterior: canalArray[1],
    };

    let qrcode = CanaisRequisicoesAjax.conectarCanal(
      ip_servidor,
      this.foneConectar
    );

    if (qrcode == "conectado") {
      document.location.reload(true);
    } else {
      let divCanais = document.querySelector(".canaisLista");
      let divQrCode = document.querySelector(".qrcodediv");

      $(divCanais).empty();
      $(divQrCode).append(RenderQrCode.qrCode());

      $(".qrcode").append(RenderQrCode.imgQrCode(qrcode));
    }

    //alert("funcionou");
    //console.log(div.id);
  }

  desconectar(event, div) {
    event.preventDefault();

    CanaisRequisicoesAjax.desconectarCanal(ip_servidor, div.id);

    document.location.reload(true);
  }
}
