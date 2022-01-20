const conexao = require("../infraestrutura/conexao");

class Chat {
  mensagem(mensagem) {
    const sql = "INSERT INTO chat SET ?";

    conexao.query(sql, mensagem, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      console.log(resultados);
    });
  }

  buscarNumerosClientes() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT DISTINCT from_number FROM chat`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var fones = JSON.parse(JSON.stringify(resultados));

          resolve(fones);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Chat();
