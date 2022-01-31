class MostrarEsconderOpcoes {
  static mostrarEsconderOpcoes() {
    document.querySelectorAll(".opcoes-conversa").forEach((item) => {
      item.addEventListener("mouseover", function () {
        if (this.children[0].className == "botoes") {
          this.children[0].style.visibility = "visible";
        } else {
          this.children[1].style.visibility = "visible";
        }
      });
    });
    document.querySelectorAll(".opcoes-conversa").forEach((item) => {
      item.addEventListener("mouseout", function () {
        if (this.children[0].className == "botoes") {
          this.children[0].style.visibility = "hidden";
        } else {
          this.children[1].style.visibility = "hidden";
        }
      });
    });
  }
}
