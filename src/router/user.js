//Importando modulos
const express = require('express')

//Importando controladores
const User = require('../controllers/UserController')

//Creamos un enrutador
const api = express.Router()

//Instaciamos los controlador para las rutas
let user = new User()

api.post('/users', user.store)
api.post('/users/signin', user.signIn)

module.exports = api