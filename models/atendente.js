const conexao = require("../infraestrutura/conexao");

class Atendente {
  buscarAtendente(idAtendente) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM atendentes WHERE id = '${idAtendente}'`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var atendenteJson = JSON.parse(JSON.stringify(resultados));
          resolve(atendenteJson);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarTodosAtendentes() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM atendentes`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var atendenteJson = JSON.parse(JSON.stringify(resultados));

          resolve(atendenteJson);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarLogin(login, senha) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM atendentes WHERE (usuario='${login}' or email='${login}') and senha='${senha}' limit 1`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
            this.login = null;
          }
          var loginJson = JSON.parse(JSON.stringify(resultados));

          resolve(loginJson);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  cadastrarAtendente(atendente) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO atendentes SET ?`;

        conexao.query(sql, atendente, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var atendenteJson = JSON.parse(JSON.stringify(resultados));

          resolve(atendenteJson);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  excluirAtendente(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `DELETE FROM atendentes WHERE id=${id}`;
        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }

          resolve("cadastro inserido com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarPrimeiroAtendente() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM atendentes LIMIT 1`;
        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var atendente = JSON.parse(JSON.stringify(resultados));

          resolve(atendente);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  inserirPrimeiroAtendente() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO atendentes (nome, email, senha, usuario, nivel_acesso) VALUES ( 'admin', 'admin@admin', 'admin4521', 'admin', 'admin')`;
        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var atendente = JSON.parse(JSON.stringify(resultados));

          resolve(atendente);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  atualizarAtendente(atendente, id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE atendentes SET ? WHERE id=${id}`;
        conexao.query(sql, atendente, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          resolve(resultados);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  cadastrarAvatar(caminho, id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE atendentes SET caminho_avatar='${caminho}' WHERE id='${id}'`;
        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          resolve(resultados);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Atendente();
