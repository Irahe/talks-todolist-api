const server = require("../../testServerSetup");

describe('Rotas de Autenticação', () => {
  let authToken = '';
  beforeAll(async () => {
    const response = await server.post('/login/').send({
      email: 'zezinho1@email.com',
      password: 'admin123'
    })
    authToken = response?.body?.data?.token
  })

  test('GET - /users/', async () => {
    const response = await server.get('/users/').set('Authorization', `Bearer ${authToken}`);
    expect(response?.status).toEqual(200);
  });
  test('GET - /users/ - 401', async () => {
    const response = await server.get('/users/').set('Authorization', `Bearer ${authToken}-wrongtoken`);
    expect(response?.status).toEqual(401);
  });

});