var mysql = require("mysql");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

require("dotenv").config();

let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let user = process.env.DB_USER;
let pass = process.env.DB_PASS;
let database = process.env.DB_DATABASE;

const conexaoSession = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: pass,
  database: database,
});

module.exports = conexaoSession;
