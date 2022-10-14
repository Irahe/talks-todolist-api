const server = require('./server');
const request = require('supertest');

function startServer() {
  return request.agent(server());
}

module.exports = startServer();