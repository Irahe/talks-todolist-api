const listController = require('../controllers/listController');
const errorController = require('../controllers/errorController');
const authController = require('../controllers/authController');

module.exports = ({ server, db }) => {

  server.get('/lists/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.getAll(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      });
    }
  });
  server.get('/list/:id', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.get(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      });
    }
  });
  server.post('/lists/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.create(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.put('/lists/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.update(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.del('/list/:id', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.delete(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });

  //item control
  server.post('/lists/:id/item/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.addItem(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.put('/lists/:id/item/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.updateItem(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.del('/list/:id/item/:item_id', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      listController.removeItem(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });

}