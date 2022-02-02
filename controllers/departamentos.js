const Departamentos = require("../models/departamentos");

module.exports = (app) => {
  app.post("/buscarDepartamentos", async function (req, res) {
    let departamentos = await Departamentos.buscarDepartamentos();
    res.status(200).json(departamentos);
  });
};
