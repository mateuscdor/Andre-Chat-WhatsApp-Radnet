class RenderTransferirAtendimentoPessoa {
  static renderTransferirAtendimentoPessoa() {
    let templatePessoa = `
    <div class="templatePessoa">
    <p>Selecione a(s) pessoa(s) que deseja destinar o atendimento. A primeira que
    atribuir o atendimento a si, dará continuiedade.</p>
          <div class="">
          <span>Aperte Ctrl ou Command para selecionar mais de uma pessoa</span>
          <div class="input-group mb-3">
              <select class="form-select" id="inputGroupSelect01">
                  <option value="" selected>Selecione...</option>
              </select>
          </div>
      </div>
    </div>
  `;

    return templatePessoa;
  }
}
