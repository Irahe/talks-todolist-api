const authController = require('../controllers/authController');
const errorController = require('../controllers/errorController');

module.exports = ({ server, db }) => {
  server.post('/login/', async function (req, res) {
    authController.login(req, res, db).catch((error) => {
      errorController.InternalServerError(error, res);
    })
  });
}