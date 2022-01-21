const express = require("express");
const session = require("express-session");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const funcoes = require("./funcoes/funcoes");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
const consign = require("consign");
//const conexaoSession = require("./infraestrutura/conexaoSession");
//var MySQLStore = require("express-mysql-session")(session);

require("dotenv").config();

const app = express();

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Banco de dados conectado com sucesso");
    Tabelas.init(conexao);
  }
});

/*
var sessionStore = new MySQLStore({}, conexaoSession);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
*/

//utilizado para liberar acesso ao servidor
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,HEAD,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "content-Type,x-requested-with");
  app.use(cors());
  next();
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/perfil", express.static(path.join(__dirname, "public")));

//novas mudanças inseridas
app.set("view engine", "ejs");

consign().include("controllers").into(app);

// server-side
io.on("connection", (socket) => {
  funcoes.consoleConectado(socket, io);
});

httpServer.listen(process.env.SERVER_PORT);
