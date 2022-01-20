class HeaderController {
  constructor() {}
  deslogar() {
    localStorage.removeItem("id");
    localStorage.removeItem("nome");
  }
}
