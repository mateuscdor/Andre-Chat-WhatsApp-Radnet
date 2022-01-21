class GuardarNumerosClicacos {
  constructor() {
    this.numeros = null;
  }

  static guardarNumerosClicacos(cliente, conectado) {
    this.numeros = {
      cliente: cliente,
      conectado: conectado,
    };
  }

  static retornarNumerosClicacos() {
    return this.numeros;
  }
}
