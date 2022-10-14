const server = require("../../testServerSetup");

describe('Rotas de Autenticação', () => {

  test('testa rota de login - credenciais corretas', async () => {
    //post no /login e receber os dados corretos

    const response = await server.post(`/login/`).send({
      email: 'zezinho1@email.com',
      password: 'admin123'
    })

    expect(response?.status).toEqual(200);
  });

  test('testa rota de login - credenciais incorretas', async () => {
    //post no /login e receber os dados corretos

    const response = await server.post(`/login/`).send({
      email: 'zezinho1@email.com',
      password: 'some-wrong-password'
    })

    expect(response?.status).toEqual(401);

  });

  test('testa rota de login - request incorreto', async () => {
    //post no /login e receber os dados corretos
    const response = await server.post(`/login/`).send({
      email: 'zezinho1@email.com',
      qualquerParametro: 'some-wrong-password'
    })

    expect(response?.status).toEqual(500);

  });

});