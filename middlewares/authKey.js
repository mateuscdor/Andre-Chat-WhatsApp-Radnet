const authKey = (req, res, next) => {
  if (req.query.token == process.env.KEY_API_SECRET) {
    next();
  } else {
    res
      .status(203)
      .json("Acesso negado: Você não está autorizado a utilizar esse serviço");
  }
};

module.exports = authKey;
