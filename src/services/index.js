//Importamos modulos
const jwt = require('jwt-simple')
const moment = require('moment')

//Importando archivo de configuracion
const config = require('../config')

module.exports = {
  createToken: function(user) {
    const payload = {
      sub: user.id,
      iat: moment().unix(),
      exp: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, config.secret)
  },
  decodeToken: function(token) {
    const decoded = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, config.secret, true)
        if(payload.exp <= moment().unix()) {
          reject({
            status: 401,
            message: 'Token expirado.'
          })
        }
        resolve(payload.sub)
      } catch(error) {
        reject({
          status: 500,
          message: 'Token invalido.'
        })
      }
    })
    return decoded
  }
}
