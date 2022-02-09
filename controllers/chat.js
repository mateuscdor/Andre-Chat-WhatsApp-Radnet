const Chat = require("../models/chat");
const funcoes = require("../funcoes/funcoes");
const Mensagens = require("../models/mensagens");
const Atendente = require("../models/atendente");
const Notificacao = require("../models/notificacoes");
const Protocolos = require("../models/protocolos");
const transferenciaAtendimento = require("../models/transferenciaAtendimento");
const clientes = require("../models/clientes");
const cliente_endereco = require("../models/cliente_endereco");
const endereco = require("../models/endereco");
const mensagensSistema = require("../models/mensagensSistema");

require("dotenv").config();

module.exports = (app) => {
  app.get("/chat", async function (req, res) {
    console.log("api /chat");

    let ip_servidor = process.env.IP_SERVIDOR;

    let todasNotificacoes = await Notificacao.contarNotificacoes();

    let canal = 1;
    res.render("pages/chat/index", {
      ip_servidor: ip_servidor,
      canal: canal,
      notificacoes: todasNotificacoes[0],
      protocolo: null,
    });
  });

  // Rota para enviar mensagens do front
  app.post("/enviar", async function (req, res) {
    console.log("api /enviar");
    let respostaMensagem = await funcoes.enviarMensagem(req.query);

    let mensagem = req.query;

    mensagem.id_mensagem = respostaMensagem.id;

    Chat.mensagem(mensagem);
    res.status(200).json(respostaMensagem);
  });

  // Faz a busca das mensagens no chat
  app.post("/recuperarMensagens", async function (req, res) {
    console.log("api /recuperarMensagens");
    let mensagens = await Mensagens.buscarMessages(
      req.query.toNumber,
      req.query.fromNumber
    );
    //let mensagens = Messages.retornarDados();

    // faz o envio das mensagens para o front
    await funcoes.mensagensAnteriores(mensagens);
    res.status(200).json(mensagens);
  });

  //
  app.post("/carregarConversas", async function (req, res) {
    console.log("api /carregarConversas");
    let conversas = await Mensagens.buscarConversasNumero();
    //let conversas = Messages.retornarConversas();
    res.status(200).json(conversas);
  });

  app.post("/inserirNotificacoes", function (req, res) {
    Notificacao.inserirNotificacao(req.query);
    console.log(req.query);
    res.status(200).json(req.query);
  });

  app.post("/removerNotificacao", async function (req, res) {
    Notificacao.removerNotificacoes(req.query.fone);
    res.status(200).json("notificacoes removidas com sucesso");
  });

  app.post("/contarNotificacoes", async function (req, res) {
    let mensagens = await Notificacao.contarNotificacoes();
    res.status(200).json(mensagens);
  });

  app.post("/buscarProtocolo", async function (req, res) {
    let protocolo = await Protocolos.buscarProtocolos(req.query.fone);
    res.status(200).json(protocolo);
  });

  app.post("/buscarFoneClientes", async function (req, res) {
    let clientes = await Chat.buscarNumerosClientes();
    res.status(200).json(clientes);
  });

  app.post("/criarProtocolo", async function (req, res) {
    let protocolo = await Protocolos.criarProtocolo(req.query);
    res.status(200).json(protocolo);
  });

  app.post("/enviarMensagemInterna", function (req, res) {
    Chat.mensagem(req.query);
    res.status(200).json("mensagem enviada");
  });

  app.post("/transferirAtendimento", function (req, res) {
    transferenciaAtendimento.criarTransferenciaAtendimento(req.query);
    res.status(200).json("transferencia feita com sucesso");
  });

  app.post("/criarCliente", async function (req, res) {
    let idCliente = await clientes.criarCliente(req.query);
    res.status(200).json(idCliente);
  });

  app.post("/criarClienteEndereco", async function (req, res) {
    await cliente_endereco.criarClienteEndereco(req.query);
    res.status(200).json("transferencia feita com sucesso");
  });

  app.post("/atualizarClienteEndereco", async function (req, res) {
    let id = req.query.id;
    let contato = { contato: req.query.contato };
    let clienteChat = await cliente_endereco.atualizarClienteEndereco(
      id,
      contato
    );
    res.status(200).json(clienteChat);
  });

  app.post("/pesquisarEnderecoCliente", async function (req, res) {
    let enderecoCliente = await cliente_endereco.retornarClienteEndereco(
      req.query.contato
    );
    res.status(200).json(enderecoCliente);
  });

  app.post("/criarEndereco", async function (req, res) {
    let id_endereco = await endereco.criarEndereco(req.query);
    res.status(200).json(id_endereco);
  });

  app.post("/pesquisarEndereco", async function (req, res) {
    let enderecoCliente = await endereco.pesquisarEndereco(req.query.id);
    res.status(200).json(enderecoCliente);
  });

  app.post("/pesquisarCliente", async function (req, res) {
    let clienteChat = await clientes.pesquisarCliente(req.query.id);
    res.status(200).json(clienteChat);
  });

  app.post("/pesquisarClienteFone", async function (req, res) {
    let clienteChat = await clientes.pesquisarClienteFone(req.query.fone);
    res.status(200).json(clienteChat);
  });

  app.post("/atualizarCliente", async function (req, res) {
    let cliente = {
      nome: req.query.nome,
      segundoContato: req.query.segundoContato,
      email: req.query.email,
      empresa: req.query.empresa,
      anotacoes: req.query.anotacoes,
      id_endereco: req.query.id_endereco,
    };
    let id = req.query.id;
    let atualizacaoCliente = await clientes.atualizarCliente(cliente, id);
    res.status(200).json(atualizacaoCliente);
  });

  app.post("/atualizarEndereco", async function (req, res) {
    let enderecoCliente = {
      cep: req.query.cep,
      logradouro: req.query.logradouro,
      numero: req.query.numero,
      complemento: req.query.complemento,
      cidade: req.query.cidade,
      estado: req.query.estado,
      pais: req.query.pais,
    };
    let id = req.query.id;
    let atualizacaoEndereco = await endereco.atualizarEndereco(
      id,
      enderecoCliente
    );
    res.status(200).json(atualizacaoEndereco);
  });

  app.post("/pegarMensagens", async function (req, res) {
    let mensagem = await mensagensSistema.buscarMensagensSistema(req.query.id);
    res.status(200).json(mensagem);
  });

  app.post("/encaminhar-mensagem", async function (req, res) {
    let respostaMensagem = await funcoes.encaminharMensagem(req.query);
    res.status(200).json(respostaMensagem);
  });
};
