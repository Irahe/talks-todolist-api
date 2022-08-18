const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

module.exports = (serverParams) => {
  //auth
  authRoutes(serverParams);

  //data
  userRoutes(serverParams);

}