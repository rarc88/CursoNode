const bcrypt = require('bcrypt-nodejs')
const moment = require('moment')
const pool = require('../database/connection')
const service = require('../services/index')

class User {
  index(request, response) {}

  create(request, response) {}

  store(request, response) {
    let user = {
      ...request.body,
      password: bcrypt.hashSync(request.body.password),
      sign_up_date: moment().format('YYYY-MM-DD h:mm:ss'),
      last_log_in: moment().format('YYYY-MM-DD h:mm:ss'),
      active: true
    }
    pool.query(
      'INSERT INTO node_users SET ?',
      user,
      (error, result) => {
        if (error) {
          response.status(500).send({
            message: 'Error de comunicacion con la base de datos.',
            error: error
          })
        }
        user.id = result.insertId
        user.password = ''
        response.status(201).send({
          auth: true,
          message: `Registrado con exito.`,
          token: service.createToken(user),
        })
      }
    )
  }

  show(request, response) {}

  edit(request, response) {}

  update(request, response) {}

  destroy(request, response) {}

  signIn(request, response) {
    pool.query(
      'SELECT * FROM node_users WHERE email = ?',
      request.body.email,
      (error, result) => {
        if (error) {
          return response.status(500).send({
            message: 'Error de comunicacion con la base de datos.',
            error: error
          })
        }
        if (!result.length) {
          return response.status(404).send({
            auth: false,
            message: 'Email incorrecto.'
          })
        }
        let user = result[0]
        let passwordIsValid = bcrypt.compareSync(request.body.password, user.password)
        if (!passwordIsValid) {
          return response.status(401).send({
            auth: false,
            message: 'Clave invalida.'
          })
        }
        return response.status(201).send({
          auth: true,
          message: 'Sesion iniciada correctamente.',
          token: service.createToken(user)
        })
      }
    )
  }
}

module.exports = User
