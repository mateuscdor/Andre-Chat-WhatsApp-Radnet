class RenderTransferirAtendimentoDepartamento {
  static renderTransferirAtendimentoDepartamento() {
    let templateDepartamento = `
  
  <div class="templateDepartamento">
  <p>Selecione um departamento para transferir o atendimento e notificar todos os atendentes vinculados a este. Assim, o primeiro que o atribuir a si, será o responsável.</p>
     <div class="">
         <span>Selecione um departamento</span>
         <div class="input-group mb-3">
  <select class="form-select" id="inputGroupSelect01">
  <option value="" selected>Selecione...</option>
  </select>
  </div>
  </div>
  </div>
   
   `;

    return templateDepartamento;
  }
}
