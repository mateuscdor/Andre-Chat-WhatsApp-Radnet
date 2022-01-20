const conexao = require("../infraestrutura/conexao");

class Logados {
  inserirUsuarioLogado(usuario) {
    return new Promise((resolve, reject) => {
      try {
        const sql = "INSERT INTO logados SET ?";

        conexao.query(sql, usuario, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          console.log(resultados);
          resolve("cadastro inserido com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  mudarStatus(status, atendente) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE logados SET ? WHERE atendente='${atendente}'`;

        conexao.query(sql, status, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          console.log(resultados);
          resolve("cadastro atualizado com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  pesquisarLogadoNome(nome) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM logados WHERE atendente='${nome}'`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var logado = JSON.parse(JSON.stringify(resultados));
          resolve(logado);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Logados();
