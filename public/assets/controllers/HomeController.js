class HomeController {
  constructor() {
    localStorage.setItem("id", logado.id);
    localStorage.setItem("nome", logado.nome);
    console.log(localStorage.getItem("id") + localStorage.getItem("nome"));
  }
}
