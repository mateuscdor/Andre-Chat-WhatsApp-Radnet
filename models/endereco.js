const conexao = require("../infraestrutura/conexao");

class Endereco {
  criarEndereco(endereco) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO endereco SET ?`;

        conexao.query(sql, endereco, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var id_endereco = JSON.parse(JSON.stringify(resultados));

          resolve(id_endereco);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  pesquisarEndereco(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM endereco WHERE id='${id}'`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var endereco = JSON.parse(JSON.stringify(resultados));

          resolve(endereco);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  atualizarEndereco(id, endereco) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE endereco SET ? WHERE id='${id}'`;

        conexao.query(sql, endereco, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var endereco = JSON.parse(JSON.stringify(resultados));

          resolve(endereco);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Endereco();
