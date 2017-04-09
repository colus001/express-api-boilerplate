const mongoose = require('mongoose')
const userSchema = require('./user')

mongoose.model('User', userSchema)
