const conexao = require("../infraestrutura/conexao");

class Session {
  buscarUsuarioSession(session_id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM sessions WHERE session_id = '${session_id}' LIMIT 1`;

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var sessionUser = JSON.parse(JSON.stringify(resultados));

          resolve(sessionUser);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Session();
