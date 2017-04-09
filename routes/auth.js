const { pick } = require('lodash')
const passport = require('passport')
const { Router } = require('express')
const mongoose = require('mongoose')

const Tokenizer = require('../utils/tokenizer')

const User = mongoose.model('User')

const router = new Router()

const secureUser = user => Tokenizer.sign(pick(user, ['name', 'shortId', 'email', 'alias']))

// EMAIL
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

    res.send(secureUser(user))
  })(req, res, next)
})

// FACEBOOK
router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    if (err || !user) {
      next(new Error('UNAUTHORIZED'))
      return
    }

    res.send(secureUser(user))
  })(req, res, next)
})

module.exports = router
