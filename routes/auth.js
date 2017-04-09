const { pick } = require('lodash')
const passport = require('passport')
const { Router } = require('express')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const router = new Router()

const secure = user => pick(user, ['name', 'shortId', 'email', 'alias'])

router.post('/signup', (req, res, next) => {
  new User(req.body)
    .save()
    .then(user => res.json(user))
    .catch(next)
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      next(new Error('UNAUTHORIZED'))
      return
    }

    res.send(secure(user))
  })(req, res, next)
})

module.exports = router
