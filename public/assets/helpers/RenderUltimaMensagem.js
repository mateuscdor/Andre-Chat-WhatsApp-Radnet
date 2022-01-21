class RenderUltimaMensagem {
  static renderUltimaMensagem(element, ip_servidor, canaisCadastrados) {
    let templateUltimaConversa = `
     
        <div class='d-flex pop-chat mb-1 clientesConversa' id="${element.from_number}-${element.to_number}">
            <div class='d-flex justify-content-center align-items-center flex-grow-1'>
                <img src='assets/img/transferir.png' class='img-chat m-2'>
            </div>
         
            <div class='w-100 m-2'>
                <div class='d-flex justify-content-between data-hora'>
                    <p class="text-light">De: ${element.from_number} <br> Para: ${element.to_number} </p>
                    <p class="text-light pe-2"> ${element.created_at} </p>
                </div>
      
                <div class='mensagem'>
                    <p class="text-light" style=" max-width: 30ch; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;"> ${element.content} </p>
                </div>
  
      
            </div>
            
         
        </div>
  
        `;

    return templateUltimaConversa;
  }

  static adicionarEventoConversa(ip_servidor, canaisCadastrados) {
    document.querySelectorAll(".clientesConversa").forEach((item) => {
      item.addEventListener("click", () => {
        const toFromId = item.id.split("-");
        let canaisBuscados = [];
        canaisBuscados = canaisCadastrados;
        let contem = null;
        let fones = null;

        canaisBuscados.forEach((element) => {
          if (element.fone == toFromId[0]) {
            contem = "ok";
          }
        });

        if (contem == "ok") {
          fones = {
            from_number: toFromId[1],
            to_number: toFromId[0],
          };
        } else {
          fones = {
            from_number: toFromId[0],
            to_number: toFromId[1],
          };
        }

        GuardarNumerosClicacos.guardarNumerosClicacos(
          fones.from_number,
          fones.to_number
        );

        ChatRequisicoesAjax.pegarMensagens(ip_servidor, fones);

        let telaChat = document.querySelector("#tela-chat");
        telaChat.style.visibility = "visible";

        //remover notificacao
        //removerNotificacao(ip_servidor, fones.from_number);
        ChatRequisicoesAjax.removerNotificacoes(ip_servidor, fones.from_number);

        $("#buscar").prop("disabled", false);

        if (item.children[2]) {
          item.children[2].style.visibility = "hidden";
          let valorDiv = item.children[2].children[0].children[0].textContent;
          let resultado = parseInt(valorDiv) + 1;
          item.children[2].children[0].children[0].innerHTML = "";
        }

        let protocoloAtendimento;

        protocoloAtendimento = ChatRequisicoesAjax.buscarProtocolo(
          ip_servidor,
          fones.from_number
        );

        let clienteStrong = document.querySelector("#clienteStrong");
        clienteStrong.innerHTML = fones.from_number;

        let clienteSmall = document.querySelector("#clienteSmall");
        clienteSmall.innerHTML = fones.from_number;

        let canalStrong = document.querySelector("#canalStrong");
        canalStrong.innerHTML = `Canal: ${fones.to_number}`;

        let protocoloSmall = document.querySelector("#protocoloSmall");
        protocoloSmall.innerHTML = `Protocolo: ${protocoloAtendimento[0].protocolo}`;
      });
    });
  }
}
