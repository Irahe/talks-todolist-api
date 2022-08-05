const sha1 = require('sha1');

module.exports = {
  async getAll(req, res, db) {
    //é onde agt pega os dados dos usuários
    const users = await db.select('*').from('user');
    res.send(users);
  },

  async get(req, res, db) {
    const { id } = req.params;
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

    await db('user').insert(data);

    res.send(201);
  },

  async update(req, res, db) {
    const data = req.body;
    if (!data?.password || !data?.password?.length) {
      res.send(500, 'Manda a senha fafavô sô!');
      return;
    }
    data.password = sha1(data.password)

    const { id } = data;
    if (!id) {
      res.send(404);
    }

    await db('user').where({ id }).update(data);

    res.send(201);
  },

  async delete(req, res, db) {
    const { id } = req.params;

    await db('user').where({ id }).del();

    res.send(204);

  }
}