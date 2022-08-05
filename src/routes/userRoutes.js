const userController = require('../controllers/userController');

module.exports = ({ server, db }) => {

  server.get('/users/', async function (req, res) {
    userController.getAll(req, res, db).catch((error) => {
      res.send(500);
    })
  });
  server.get('/user/:id', async function (req, res) {
    userController.get(req, res, db).catch((error) => {
      res.send(500);
    })
  });
  server.post('/users/', async function (req, res) {
    userController.create(req, res, db).catch((error) => {
      res.send(500);
    })
  });
  server.put('/users/', async function (req, res) {
    userController.update(req, res, db).catch((error) => {
      res.send(500);
    })
  });
  server.del('/user/:id', async function (req, res) {
    userController.delete(req, res, db).catch((error) => {
      res.send(500);
    })
  });


}