const server = require('./server.js');

const startServer = function () {
  //coloca o server em listenig mode (inicia ele).
  server().listen(process.env.SV_PORT, function () {
    console.log('listening at', process.env.SV_PORT);
  });
}

startServer();