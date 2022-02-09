class RenderResponder {
  static renderResponder(mensagem) {
    let responder = `
        <div class="box-resposta" style="position:relative;left:0; margin-bottom: -50px;margin-right: 30px; text-align:right">
          <div class="">
              <i class="fas fa-times text-danger bg-light p-1 rounded fechar-resposta" onclick="chatController.fecharResponder()"></i>
          </div>
        </div>
      
      <div class="texto-copiar text-break" style="margin:20px;background-color:darkorange;padding:30px;" id="responderMensagem">
       ${mensagem}
      </div>
        `;

    $(".responder").append(responder);
  }
}
