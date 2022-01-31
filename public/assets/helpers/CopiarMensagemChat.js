class CopiarMensagemChat {
  static copiarmensagemChat() {
    document.querySelectorAll(".copiar_message").forEach((item) => {
      item.addEventListener("click", function () {
        let copy = this.parentNode.parentNode.parentNode.parentNode.children[0];

        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(copy).text().trim()).select();
        document.execCommand("copy");
        $temp.remove();

        toastr.success("Mensagem copiada para área de tranferência");
      });
    });
  }
}
