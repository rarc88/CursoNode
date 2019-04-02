//Importando modulos
const mysql = require('mysql')

//Importando archivo de configuracion
const config = require('../config')

//Creamos un pool de MySQL
const pool = mysql.createPool(config.dataBase)


module.exports = pool
