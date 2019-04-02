//Importando modulos
const express = require('express')

//Importando controladores
const Knowledge = require('../controllers/KnowledgeController')

//Importando middlewares
const auth = require('../middlewares/auth')

//Creamos un enrutador
const api = express.Router()

//Instaciamos los controlador para las rutas
let know = new Knowledge()

//Manejo de peticiones segun la ruta
api.get('/knowledges', auth.isAuth, know.index)
api.post('/knowledges', auth.isAuth, know.store)
api.get('/knowledges/:id', auth.isAuth, know.show)
api.put('/knowledges/:id', auth.isAuth, know.update)
api.delete('/knowledges/:id', auth.isAuth, know.destroy)

module.exports = api
