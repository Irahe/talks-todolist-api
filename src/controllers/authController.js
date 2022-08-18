const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const errorController = require('./errorController');

module.exports = {
  async login(req, res, db) {
    const user = await db('user').where({
      email: req?.body?.email,
      password: sha1(req?.body?.password)
    }).first();
    //se esse cara existir na base, esse objeto vai conter os dados dele, se não, pode retornar "num achei"
    if (!user) {
      errorController.Unauthorized(res);
      return;
    } else {
      delete (user.password)
      //isso significa que ele passou as credenciais corretamente
      jwt.sign({ user }, process?.env?.SV_SECRET, (err, token) => {
        if (err) {
          throw new Error("Token could not be generated. it is not your fault. :/");
        } else {
          res.send({
            status: 'success',
            data: {
              token,
              user
            }
          })
        }
      })

    }


  },
  async verifyToken(req, res, db, context) { // context = "user" || "op"
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const tkn = bearerHeader.split(' ')[1];
      const data = await jwt.verify(tkn, process?.env?.SV_SECRET, async (err, tokenData) => {
        if (err) {
          errorController.Unauthorized(res);
          return;
        } else {
          const userData = await db('user').where({ id: tokenData?.user?.id }).first();
          if (userData) {
            if (context !== 'user' && context !== userData?.type) {
              errorController.Unauthorized(res);
              return;
            }
            return userData;
          } else {
            errorController.Unauthorized(res);
            return;
          }
        }
      });
      return data;
    } else {
      errorController.Unauthorized(res);
      return;
    }
  }
}