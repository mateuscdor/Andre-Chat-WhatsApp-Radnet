const conexao = require("../infraestrutura/conexao");

class Departamentos {
  buscarDepartamentos() {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM departamentos";

        conexao.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          console.log(resultados);

          var departamentos = JSON.parse(JSON.stringify(resultados));
          resolve(departamentos);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Departamentos();
