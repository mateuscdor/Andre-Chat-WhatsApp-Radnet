const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("erro");

class LoginController {
  constructor() {}

  exibirErroLogin() {
    switch (myParam) {
      case "nao foi possivel altenticar":
        console.log("nao foi possivel altenticar");
        $("#usuario-senha").css({ display: "block" });
        break;

      case "preencha todos os campos":
        console.log("preencha todos os campos");
        $("#preencha").css({ display: "block" });
        break;

      default:
        break;
    }
  }
}
