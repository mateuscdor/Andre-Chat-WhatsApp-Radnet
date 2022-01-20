const conexao = require("../infraestrutura/conexao");

class Notificacao {
  inserirNotificacao(notificacao) {
    const sql = "INSERT INTO notificacoes SET ?";

    conexao.query(sql, notificacao, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      console.log(resultados);
    });
  }

  removerNotificacoes(fone) {
    const sql = `DELETE FROM notificacoes WHERE fone=${fone}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      console.log(resultados);
    });
  }

  contarNotificacoes() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `select fone, COUNT(fone) as notificacoes FROM notificacoes GROUP by fone`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var result = JSON.parse(JSON.stringify(resultados));
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Notificacao();
