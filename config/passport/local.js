const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy

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
