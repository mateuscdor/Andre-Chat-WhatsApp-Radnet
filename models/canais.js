const conexao = require("../infraestrutura/conexao");

class Canais {
  inserirCanal(canal) {
    return new Promise((resolve, reject) => {
      try {
        const sql = "INSERT INTO canais SET ?";

        conexao.query(sql, canal, (erro, resultados) => {
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

  buscarCanais() {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM canais";

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var canais = JSON.parse(JSON.stringify(resultados));
          console.log(canais);

          resolve(canais);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarCanaisAtivos() {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM canais WHERE status='conectado'";

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var canais = JSON.parse(JSON.stringify(resultados));
          console.log(canais);

          resolve(canais);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  excluirCanal(fone) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `DELETE FROM canais WHERE fone=${fone}`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          resolve("canal excluirdo com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  editarCanal(canal, fone_anterior) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE canais SET ? WHERE fone=${fone_anterior}`;

        conexao.query(sql, canal, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          resolve("canal excluirdo com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  editarStatus(status, fone_anterior) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE canais SET status='${status}' WHERE fone=${fone_anterior}`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          resolve("status atualizado com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  retornarSessao(fone) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM canais WHERE fone=${fone}`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var canal = JSON.parse(JSON.stringify(resultados));
          console.log(canal);
          resolve(canal);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Canais();
