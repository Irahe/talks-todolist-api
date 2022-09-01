const sha1 = require('sha1');
const errorController = require('./errorController');

module.exports = {
  async getAll(req, res, db) {
    //é onde agt pega os dados dos usuários
    const users = await db.select('*').from('user');
    res.send(users);
  },

  async get(req, res, db) {
    const { id } = req.params;
    //verifica se o cara é op e se ele tá verifi
    if (req?.requester?.type !== 'op' && Number(req?.requester?.id) !== Number(id)) {
      errorController.Unauthorized(res);
    }
    //é onde agt pega os dados do usuário cujo id foi passado como parâmetro
    // const user = await db.select('*').from('user').where({ id:id }).first();
    const user = await db.select('*').from('user').where({ id }).first();
    res.send(user || 404);
  },

  async create(req, res, db) {
    let data = req.body;
    if (!data?.password || !data?.password?.length) {
      res.send(500, 'Manda a senha fafavô sô!');
      return;
    }
    data.password = sha1(data.password)

    await db('user').insert({ ...data, type: 'user' });

    res.send(201);
  },

  async update(req, res, db) {
    const data = req.body;
    if (!data?.password || !data?.password?.length) {
      res.send(500, 'Manda a senha fafavô sô!');
      return;
    }
    data.password = sha1(data.password)
    delete data.type;//evita atualizar o type aqui

    const { id } = data;
    if (!id) {
      res.send(404);
    }

    if (req?.requester?.type !== 'op' && Number(req?.requester?.id) !== Number(id)) { //garante o op||self
      errorController.Unauthorized(res);
    }

    await db('user').where({ id }).update(data);

    res.send(201);
  },

  async delete(req, res, db) {
    const { id } = req.params;

    if (req?.requester?.type !== 'op' && Number(req?.requester?.id) !== Number(id)) { //garante o op||self
      errorController.Unauthorized(res);
    }

    await db('user').where({ id }).del();

    res.send(204);

  },

  async op(req, res, db) {
    const { id } = req?.params;

    if (!id) {
      res.send(404);
    }
    const user = await db('user').where({ id }).first();
    if (!user) {
      errorController.NotFound(res);
    }

    const ops = await db('user').where({ type: 'op' });

    const isTheLast = ops.length === 1;
    const toggle = user?.type === 'op' ? 'user' : 'op';

    if (!isTheLast && toggle !== 'op') {
      await db('user').where({ id }).update({ type: toggle });
      res.send(201);
    } else {
      errorController.InvalidRequest('You cannot remove the last OP.', res);
    }

  },

}