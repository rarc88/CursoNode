module.exports = {
  secret: 'MiClaveDeToken',
  server: {
    url: 'http://localhost',
    port: process.env.PORT || 3333
  },
  dataBase: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_rest'
  }
}
