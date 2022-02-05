const Atendente = require("../models/atendente");

class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarChat();
    this.criarAtendente();
    this.criarProtocolo();
    this.criarNotificacoes();
    this.criarCanais();
    this.criarLogados();
    this.criarDepartamentos();
    this.criarTransferenciaAtendimento();
    this.criarCliente();
    this.criarEndereco();
    this.criarClienteEndereco();
    this.criarMensagensSistema();
  }

  criarChat() {
    const sql = `CREATE TABLE IF NOT EXISTS chat (
        id int NOT NULL AUTO_INCREMENT,
        session varchar(255),
        from_number varchar(45),
        to_number varchar(45),
        content varchar(4000), 
        type varchar(45) ,
        file_name varchar(255),
        created_at datetime NOT NULL,
        id_protocolo varchar(50),
        status varchar(45),
        PRIMARY KEY(id))`;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela chat criada com sucesso");
      }
    });
  }

  criarAtendente() {
    const sql = `CREATE TABLE IF NOT EXISTS atendentes (
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(255),
        sobrenome varchar(255),
        email varchar(255),
        senha varchar(255),
        nivel_acesso varchar(255),
        status varchar(255),
        usuario varchar(255),
        caminho_avatar varchar(255),
        PRIMARY KEY(id))`;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela atendentes criada com sucesso");
      }
    });
  }

  criarProtocolo() {
    const sql = `CREATE TABLE IF NOT EXISTS protocolo (
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(255),
        contato varchar(255),
        email varchar(255),
        empresa varchar(255),
        protocolo varchar(255),
        situacao varchar(50),
        canal varchar(50),
        PRIMARY KEY(id))`;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela protocolo criada com sucesso");
      }
    });
  }

  criarNotificacoes() {
    const sql = `
      CREATE TABLE IF NOT EXISTS notificacoes(
        id int NOT NULL AUTO_INCREMENT,
        fone varchar(255),
        PRIMARY KEY(id)
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela notificacoes criada com sucesso");
      }
    });
  }

  criarCanais() {
    const sql = `
      CREATE TABLE IF NOT EXISTS canais(
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(255),
        fone varchar(255),
        status varchar(255),
        PRIMARY KEY(id)
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela canais criada com sucesso");
      }
    });
  }

  criarLogados() {
    const sql = `
      CREATE TABLE IF NOT EXISTS logados(
        id int NOT NULL AUTO_INCREMENT,
        atendente varchar(255),
        status varchar(50),
        id_atendente varchar(50),
        PRIMARY KEY(id)
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela logados criada com sucesso");
      }
    });
  }

  criarDepartamentos() {
    const sql = `
      CREATE TABLE IF NOT EXISTS departamentos(
        id int NOT NULL AUTO_INCREMENT,
        departamento varchar(255),  
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela departamentos criada com sucesso");
      }
    });
  }

  criarTransferenciaAtendimento() {
    const sql = `
      CREATE TABLE IF NOT EXISTS transferenciaAtendimento(
        id int NOT NULL AUTO_INCREMENT,
        cliente varchar(255),  
        requerente varchar(255),  
        destino varchar(255),
        mensagem varchar(4000),
        status varchar(255),  
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela transferenciaAtendimento criada com sucesso");
      }
    });
  }

  criarCliente() {
    const sql = `
      CREATE TABLE IF NOT EXISTS clientes(
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(255),  
        contato varchar(255),  
        segundoContato varchar(255), 
        email varchar(255),
        empresa varchar(255),
        anotacoes varchar(4000), 
        id_endereco int,
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela cliente criada com sucesso");
      }
    });
  }

  criarEndereco() {
    const sql = `
      CREATE TABLE IF NOT EXISTS endereco(
        id int NOT NULL AUTO_INCREMENT,
        cep varchar(255),  
        logradouro varchar(255), 
        numero varchar(255), 
        bairro varchar(255), 
        complemento varchar(4000), 
        cidade varchar(255), 
        estado varchar(255), 
        pais varchar(255), 
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela endereco criada com sucesso");
      }
    });
  }

  criarClienteEndereco() {
    const sql = `
      CREATE TABLE IF NOT EXISTS cliente_endereco(
        id int NOT NULL AUTO_INCREMENT,
        id_cliente varchar(255),  
        id_endereco varchar(255), 
        contato varchar(255), 
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela cliente_endereco criada com sucesso");
      }
    });
  }

  criarMensagensSistema() {
    const sql = `
      CREATE TABLE IF NOT EXISTS mensagens_sistema(
        id int NOT NULL AUTO_INCREMENT,
        mensagem varchar(255),  
        tipo varchar(255),  
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela mensagens_encerramento criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
