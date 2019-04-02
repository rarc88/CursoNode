const pool = require('../database/connection')

class Knowledge {

  index(request, response) {
    pool.query(
      'SELECT * FROM node_knowledges',
      (error, result) => {
          if (error) {
            response.status(500).send({
              message: 'Error de comunicacion con la base de datos.',
              error: error
            })
          }
          response.status(200).send({
            knowledges: result
          })
      }
    )
  }

  create() {}

  store(request, response) {
    pool.query(
      'INSERT INTO node_knowledges SET ?',
      request.body,
      (error, result) => {
        if (error) {
          response.status(500).send({
            message: 'Error de comunicacion con la base de datos.',
            error: error
          })
        }
        response.status(201).send({
          id: result.insertId,
          message: `Registrado con exito.`
        })
      }
    )
  }

  show(request, response) {
    let id = request.params.id
    pool.query(
      'SELECT * FROM node_knowledges WHERE id = ?',
      id,
      (error, result) => {
        if (error) {
          response.status(500).send({
            message: 'Error de comunicacion con la base de datos.',
            error: error
          })
        }
        response.status(201).send({
          knowledges: result
        })
      }
    )
  }

  edit() {}

  update(request, response) {
    let id = request.params.id
    pool.query(
      'UPDATE node_knowledges SET ? WHERE id = ?',
      [request.body, id],
      (error, result) => {
        if (error) {
          response.status(500).send({
            message: 'Error de comunicacion con la base de datos.',
            error: error
          })
        }
        console.log(result)
        response.status(201).send({
          message: `Actualizado con exito.`
        })
      }
    )
  }

  destroy(request, response) {
    let id = request.params.id
    pool.query(
      'DELETE FROM node_knowledges WHERE id = ?',
      id,
      (error, result) => {
        if (error) {
          response.status(500).send({
            message: 'Error de comunicacion con la base de datos.',
            error: error
          })
        }
        response.status(201).send({
          message: `Eliminado con exito.`
        })
      }
    )
  }

}

module.exports = Knowledge
