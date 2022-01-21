const conexao = require("../infraestrutura/conexao");

class Cliente_Endereco {
  criarClienteEndereco(cliente) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO cliente_endereco SET ?`;

        conexao.query(sql, cliente, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }

          resolve("cliente cadastrado com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  atualizarClienteEndereco(id, contato) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE cliente_endereco SET ? WHERE id='${id}'`;

        conexao.query(sql, contato, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }

          resolve("cliente_endereco atualizado com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  retornarClienteEndereco(contato) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM cliente_endereco WHERE contato='${contato}'`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var clienteEndereco = JSON.parse(JSON.stringify(resultados));
          resolve(clienteEndereco);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Cliente_Endereco();
