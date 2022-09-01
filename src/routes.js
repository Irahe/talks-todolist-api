const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const authRoutes = require('./routes/authRoutes');

module.exports = (serverParams) => {
  //auth
  authRoutes(serverParams);

  //data
  userRoutes(serverParams);
  listRoutes(serverParams);

}