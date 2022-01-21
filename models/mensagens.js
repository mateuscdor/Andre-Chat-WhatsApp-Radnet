const conexao = require("../infraestrutura/conexao");

class Mensagens {
  messages = [];
  conversas = [];

  buscarConversasNumero() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM chat ORDER BY id ASC`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro + "deu erro");
          }
          var mensagens = JSON.parse(JSON.stringify(resultados));
          console.log(mensagens);

          resolve(mensagens); //eliminar essa linha
          //this.conversas = mensagens;
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarMessages(destino, conectado) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM chat WHERE from_number = ${destino} and to_number = ${conectado} or  from_number = ${conectado} and to_number = ${destino} ORDER BY id ASC`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro + "deu erro");
          }
          var mensagens = JSON.parse(JSON.stringify(resultados));

          resolve(mensagens); //eliminar essa linha
          //this.messages = mensagens;
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  retornarDados() {
    return this.messages;
  }

  retornarConversas() {
    return this.conversas;
  }
}

module.exports = new Mensagens();
