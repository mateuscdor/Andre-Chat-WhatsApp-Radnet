class RenderQrCode {
  static qrCode() {
    let qrcode = `
        <div class="row">
        <div
            class="col-md-12 d-flex justify-content-between align-items-center mb-3">
            <h1>Escaneie o QR CODE</h1>

            <a href="/canais"><button class="btn btn-primary btn-sm"><i
                    class="fas fa-undo me-1"></i>
                Voltar</button></a>
        </div>
    </div>
    <div
        class="row d-flex justify-content-center align-items-center">
        <div
            class="col-6 d-flex justify-content-center bg-warning pt-2 pb-2">
            <div class="qrcode">

            </div>
        </div>

    </div>
        `;

    return qrcode;
  }

  static imgQrCode(qrcode) {
    let imgQrcode = `
    <img width="100%" src="${qrcode}">
        `;

    return imgQrcode;
  }
}
