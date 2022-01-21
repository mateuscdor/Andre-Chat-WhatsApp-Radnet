const conexao = require("../infraestrutura/conexao");

class Clientes {
  criarCliente(cliente) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO clientes SET ?`;

        conexao.query(sql, cliente, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var idCliente = JSON.parse(JSON.stringify(resultados));
          resolve(idCliente);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  pesquisarCliente(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM clientes WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var cliente = JSON.parse(JSON.stringify(resultados));
          resolve(cliente);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  atualizarCliente(cliente, id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE clientes SET ? WHERE id='${id}'`;

        conexao.query(sql, cliente, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var cliente = JSON.parse(JSON.stringify(resultados));
          resolve(cliente);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Clientes();
