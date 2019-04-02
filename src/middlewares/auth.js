//Importando archivo de configuracion
const service = require('../services/index')

module.exports = {
  isAuth: function (request, response, next) {
    if(!request.headers.authorization) {
      return response.status(403).send({
        message: 'No tienes autorizacion.'
      })
    }
    const token = request.headers.authorization.split(' ')[1]
    service.decodeToken(token)
      .then(result => {
        request.user = result
        next()
      })
      .catch(error => {
        response.status(error.status).send({
          message: error.message
        })
      })
  }
}
