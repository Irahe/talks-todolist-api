module.exports = {
  InternalServerError(error, res) {
    //http 500
    const response = {
      status: 'fail',
      message: error?.message || 'Unknown error',
      stack: error?.stack //TO-DO  remove this for production
    }
    res.send(500, response);
  },
  InvalidRequest(message, res) {
    // http 400
    const response = {
      status: 'fail',
      message: message || 'Invalid request'
    }
    res.send(400, response);
  },
  Unauthorized(res) {
    //http 401
    const response = {
      status: 'fail',
      message: 'Unauthorized'
    }
    res.send(401, response);
  },
  NotFound(res) {
    //http 404
    const response = {
      status: 'fail',
      message: 'Requested resource could not be found.'
    }
    res.send(404, response);
  }
}