class InserirUltimasMensagens {
  static inserirUltimasMensagens(conversas) {
    let ultimaConversa = [];
    let numerosUnicos = [];
    let canaisCadastrados = [];
    let contem = [];
    let conversasChat = [];

    conversasChat = conversas;

    canaisCadastrados = CanaisRequisicoesAjax.buscarCanais(ip_servidor);

    canaisCadastrados.forEach((element) => {
      contem.push(element.fone);
    });

    conversasChat.forEach((element) => {
      if (
        numerosUnicos.includes(element.from_number + element.to_number) ||
        numerosUnicos.includes(element.to_number + element.from_number)
      ) {
        for (let index = 0; index < ultimaConversa.length; index++) {
          if (
            contem.includes(element.to_number) ||
            contem.includes(element.from_number)
          ) {
            if (
              ultimaConversa[index].id < element.id &&
              ultimaConversa[index].from_number == element.from_number //aki
            ) {
              ultimaConversa[index].content = element.content;
            }
          } else {
            if (
              ultimaConversa[index].id < element.id &&
              ultimaConversa[index].from_number == element.to_number //aki
            ) {
              ultimaConversa[index].content = element.content;
            }
          }
        }
      } else {
        numerosUnicos.push(element.from_number + element.to_number);

        ultimaConversa.push({
          id: element.id,
          from_number: element.from_number, //aki
          to_number: element.to_number,
          content: element.content,
          created_at: moment(element.created_at).format("DD-MM-YYYY HH:mm"),
        });
      }
    });

    ultimaConversa.forEach((element) => {
      $(".conversas-chat").append(
        RenderUltimaMensagem.renderUltimaMensagem(
          element,
          ip_servidor,
          canaisCadastrados
        )
      );
    });

    RenderUltimaMensagem.adicionarEventoConversa(
      ip_servidor,
      canaisCadastrados
    );
  }
}
