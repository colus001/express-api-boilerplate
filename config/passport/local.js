const mongoose = require('mongoose')
const { Strategy: LocalStrategy } = require('passport-local')

const User = mongoose.model('User')

const options = {
  usernameField: 'email',
  passwordField: 'password',
}

module.exports = new LocalStrategy(options, (email, password, done) => {
  User
    .findOne({ email })
    .then((user) => {
      const isValid = user && user.authenticate(password)
      done(null, isValid && user)
    })
    .catch(done)
})
