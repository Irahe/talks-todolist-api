const listController = require('../controllers/listController');
const errorController = require('../controllers/errorController');
const authController = require('../controllers/authController');

module.exports = ({ server, db }) => {

  server.get('/lists/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.getAll(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      });
    }
  });
  server.get('/list/:id', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.get(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      });
    }
  });
  server.post('/lists/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.create(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.put('/lists/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.update(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.del('/list/:id', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.delete(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });

  //item control
  server.post('/lists/:id/item/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.addItem(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.put('/lists/:id/item/', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.updateItem(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });
  server.del('/list/:id/item/:item_id', async function (req, res) {
    req.requester = await authController.verifyToken(req, res, db, 'user');
    if (req.requester) {
      userController.delete(req, res, db).catch((error) => {
        errorController.InternalServerError(error, res);
      })
    }
  });

}