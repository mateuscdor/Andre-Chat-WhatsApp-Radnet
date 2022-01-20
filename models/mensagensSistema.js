const conexao = require("../infraestrutura/conexao");

class MensagensSistema {
  buscarMensagensSistema(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM mensagens_sistema WHERE id='${id}'`;

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

  buscarTodasMensagensSistema() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM mensagens_sistema`;

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

module.exports = new MensagensSistema();
