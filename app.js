// DEPENDENCIES
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

const config = require('./config')

const app = express()
const connection = connect() // eslint-disable-line

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: '*', preflightContinue: true }))

app.use(passport.initialize())
// app.use(passport.session())

// BOOTSTRAP
require('./models')
require('./config/passport')(passport)
require('./routes')(app)

if (process.env.NODE_ENV !== 'production') {
  app.get('/throw/:code', (req) => {
    throw new Error(req.params.code)
  })
}

app.use(require('./middlewares/errorHandler'))
app.use(require('./middlewares/notFound'))

module.exports = {
  app,
  connection,
}

function connect() {
  const options = { server: { socketOptions: { keepAlive: 1 } } }
  return mongoose.connect(config.db, options).connection
}

connection
  .on('error', console.log)
  .on('disconnected', connect)
