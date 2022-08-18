require('dotenv/config');
const restify = require('restify');
const { Database } = require('sqlite3');
const routeAgregator = require('./src/routes.js');

//cria a instância do servidor restify
const server = restify.createServer({
  name: 'todo-list-api',
  version: '0.0.1'
});

//inicializa os plugins no nosso servidor
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

//cria a primeira rota
// server.get('/echo/:name', function (req, res, next) {
//   //o código acontece aqui.
//   res.send(req.params);
//   return next();
// });

//cria a conexão com o nosso banco de dados
const db = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./database.db"
  },
  useNullAsDefault: true
});

//coloca o server em listenig mode (inicia ele).
server.listen(process.env.SV_PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});

//importa as rotas unificadas do arquivo routes.js
routeAgregator({ server, db });