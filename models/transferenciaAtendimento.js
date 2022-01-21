const conexao = require("../infraestrutura/conexao");

class Transferencia {
  criarTransferenciaAtendimento(atendimento) {
    const sql = "INSERT INTO transferenciaAtendimento SET ?";

    conexao.query(sql, atendimento, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      console.log(resultados);
    });
  }
}

module.exports = new Transferencia();
