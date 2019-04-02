//Importando ficheros necesarios
const app = require('./app')

//Importando archivo de configuracion
const config = require('./config')

//Iniciamos el servidor
app.listen(config.server.port, () => {
  console.log(`Servidor activo ${config.server.url}:${config.server.port}`);
})
