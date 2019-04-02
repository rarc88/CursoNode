//Importando modulos
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')

//Importando enrutadores
const know = require('./router/knowledge')
const user = require('./router/user')


//Creamos una instancia de express
const app = express()

//Indicamos como queremos tratar la data del request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))

//Enrutamiento primario
app.use('/api', know)
app.use('/api', user)

module.exports = app
