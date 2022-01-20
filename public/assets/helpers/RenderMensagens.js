class RenderMensagens {
  static renderInicio() {
    let inicio = `
        <div class="inicio mb-5">
    
    
    
    <div class="d-flex justify-content-evenly flex-wrap p-3">
    
        <div class="d-flex flex-column bg-danger p-2 m-1 rounded text-center"
            style="width: 200px; height:112px">
            <div class="d-flex  align-items-center justify-content-center">
                <i class="fas fa-history me-2 fa-lg"></i>
                <span class="fs-2">006</span>
            </div>
            <div class="text-center">
                <p class="text-wrap">
                    Mensagens nos últimos 7 dias
                </p>
            </div>
        </div>
    
        <div class="d-flex flex-column bg-danger p-2 m-1 rounded "
            style="width: 200px; height:112px">
            <div class="d-flex  align-items-center justify-content-center">
                <i class="fas fa-cloud-upload-alt me-2 fa-lg"></i>
                <span class="fs-2">006</span>
            </div>
            <div class="text-center">
                <p class="text-wrap">
                    Mensagens enviadas via chat
                </p>
            </div>
        </div>
    
        <div class="d-flex flex-column bg-danger p-2 m-1 rounded "
            style="width: 200px; height:112px">
            <div class="d-flex  align-items-center justify-content-center">
                <i class="fas fa-cloud-download-alt me-2 fa-lg"></i>
                <span class="fs-2">006</span>
            </div>
            <div class="text-center">
                <p class="text-wrap">
                    Mensagens recebidas via chat
                </p>
            </div>
        </div>
    
        <div class="d-flex flex-column bg-danger p-2 m-1 rounded "
            style="width: 200px; height:112px">
            <div class="d-flex  align-items-center justify-content-center">
                <i class="fas fa-code me-2 fa-lg"></i>
                <span class="fs-2">006</span>
            </div>
            <div class="text-center">
                <p class="text-wrap">
                    Mensagens enviadas via api
                </p>
            </div>
        </div>
    
    
    </div>
    <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
            <h3>Mensagens recebidas nas últimas 24h</h3>
        </div>
        <div class=" d-flex justify-content-center align-items-center">
            <div class="d-flex align-items-center input-group">
                <input type="text" class="form-control" placeholder="Encontre mensagens"
                    aria-label="Username" aria-describedby="basic-addon1">
    
    
            </div>
    
        </div>
    
    </div>
    <div class=" mt-3">
        <table class="table">
            <thead class="table-dark">
                <tr>
    
                    <td class="col-7">MENSAGEM</td>
                    <td class="col-3 text-center">CONTATO</td>
                    <td class="col-2 text-center"> - </td>
                </tr>
    
    
            </thead>
            <tbody>
                <tr>
    
                    <td class="col-7">teste</td>
                    <td class="col-3 text-center">(61) 9 9999 - 9999</td>
                    <td class="col-2 text-center">
                        <span class="bg-success p-1 rounded">ativo</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    
    </div>
        
        `;

    return inicio;
  }

  static renderAutomaticas() {
    let automaticas = `
    <div class="automaticas mb-5 ">
    <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
            <h3>Mensagens automáticas</h3>
        </div>
        <div class=" d-flex justify-content-center align-items-center">
            <div class="d-flex align-items-center input-group">
                <input type="text" class="form-control" placeholder="Encontre mensagens"
                    aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <i class="fas fa-plus bg-success pt-2 pb-2 pe-3 ps-3 rounded ms-3 me-3"></i>
        </div>
    
    </div>
    <div class=" mt-3">
        <table class="table">
            <thead class="table-dark">
                <tr>
    
    
                    <td class="col-6">DESCRIÇÃO</td>
                    <td class="col-2 text-center">USUÁRIO</td>
                    <td class="col-2 text-center">CANAIS</td>
                    <td class="col-2 text-center"> STATUS </td>
                </tr>
    
    
            </thead>
            <tbody>
                <tr>
    
    
                    <td class="col-6">teste</td>
                    <td class="col-2 text-center">YASMIN</td>
                    <td class="col-2 text-center">VARIOS</td>
                    <td class="col-2 text-center">
                        <span class="bg-success p-1 rounded">ativo</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    
    `;

    return automaticas;
  }

  static renderFilaDeEnvio() {
    let fila = `
    <div class="inicio mb-5">
        <div class="bg-primary p-4">
        <i class="fas fa-grin-beam-sweat me-2"></i> <span> Você não possui mensagens!</span>
        </div>
    
    </div>
    `;

    return fila;
  }

  static renderModelos() {
    let modelo = `
    <div class="MensagensModelo">
        <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <h3>Mensagens modelos</h3>
            </div>
            <div class=" d-flex justify-content-center align-items-center">
                <div class="d-flex align-items-center input-group">
                    <input type="text" class="form-control" placeholder="Encontre mensagens"
                        aria-label="Username" aria-describedby="basic-addon1">
    
    
                </div>
                <i class="fas fa-plus bg-success pt-2 pb-2 pe-3 ps-3 rounded ms-3 me-3"></i>
            </div>
    
        </div>
        <div class="mt-3">
        <table class="table">
        <thead class="table-dark">
            <tr>
      
                <td class="col-10">DESCRIÇÃO</td>
                <td class="col-2 text-center">STATUS</td>
            </tr>
      
      
        </thead>
        <tbody class="mensagensTabela">
       
        </tbody>
      </table>
        </div>
    </div>`;

    return modelo;
  }

  static inserirMensagens(element) {
    let mensagens = `
    <tr>
      
        <td class="col-10">${element.mensagem}</td>
        <td class="col-2 text-center">
            <span class="bg-success p-1 rounded">${element.tipo}</span>
        </td>
    </tr>
    `;
    return mensagens;
  }
}
