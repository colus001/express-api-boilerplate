const { app, connection } = require('./app')

const port = process.env.PORT || 6688
const env = process.env.NODE_ENV || 'development'

connection.once('open', listen) // eslint-disable-line

function listen() {
  app.listen(port, () => {
    console.log(`Node.js api server listening from ${port} in ${env}`)
  })
}
