const mongoose = require('mongoose')

const local = require('./passport/local')
const facebook = require('./passport/facebook')

const User = mongoose.model('User')

module.exports = function (passport) {
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((_id, done) => User.findOne({ _id }, done))

  passport.use(local)
  passport.use(facebook)
}
