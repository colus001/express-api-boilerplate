const { assign } = require('lodash')
const mongoose = require('mongoose')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const config = require('../')

const User = mongoose.model('User')

const extractUserFromProfile = ({ id, provider, _json, name, emails }, accessToken, refreshToken) => ({
  name: `${name.familyName} ${name.givenName}`.trim(),
  email: emails[0].value,
  provider: {
    name: provider,
    id,
  },
  meta: assign({}, _json, {
    accessToken,
    refreshToken,
  }),
})

module.exports = new FacebookStrategy(config.facebook, (accessToken, refreshToken, profile, done) => {
  const fbUser = extractUserFromProfile(profile, accessToken, refreshToken)
  const { email } = fbUser
  if (!email) {
    done(null, false)
    return
  }

  User
    .findOne({ email })
    .then((user) => {
      if (!user) return new User(fbUser).save()
      return user.update(fbUser).then(updated => User.findOne(updated._id))
    })
    .then(user => done(null, user))
    .catch(done)
})
